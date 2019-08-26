#!/usr/bin/env bash

set -o errexit
set -o pipefail
# set -o nounset
# set -o xtrace

SCRIPT_NAME=$(basename "$0")
DIR_NAME="$(dirname "$0")"

##
## Default usage message.
##
function usage() {
    echo "Usage: ${SCRIPT_NAME} [artifact] [manifest] [env]" 1>&2
}

##
## Verify that the script has the correct input and environment settings
## required to complete the process.
##
function validate_env() {
    : "${CF_USERNAME:?"The environment variable 'CF_USERNAME' must be set and non-empty"}"
    : "${CF_PASSWORD:?"The environment variable 'CF_PASSWORD' must be set and non-empty"}"
    : "${CF_ORG:?"The environment variable 'CF_ORG' must be set and non-empty"}"
    : "${CF_SPACE:?"The environment variable 'CF_SPACE' must be set and non-empty"}"
    : "${CF_APPNAME:?"The environment variable 'CF_APPNAME' must be set and non-empty"}"
    : "${CF_DOMAINS:?"The environment variable 'CF_DOMAINS' must be set and non-empty"}"
    : "${CF_API_PREFIX:?"The environment variable 'CF_API_PREFIX' must be set and non-empty"}"
    command -v cf >/dev/null 2>&1 || error_exit "$LINENO: the cf-cli is not available on this machine" 1
    cf -v || error_exit "$LINENO: the cf-cli is not working on this machine" 1
}

##
## Global error handling method to assist with debugging if an error would
## occur.
##
## INPUT(S):
##  $1: error_message
##  $2: exit_code
##
function error_exit() {
    echo "${SCRIPT_NAME}: ${1:-"Unknown Error"}" 1>&2
    echo "##teamcity[message text='$1' errorDetails='${SCRIPT_NAME}:$1' status='ERROR']"
    exit "$2"
}

##
## Invokes the final clean up activities for the script.  This is especially
## important if running on a CI "agent" so that any other jobs can't take
## advantage of an already authenticated CLI.
##
## This method is registered with the trap command prior to invoking the
## "main" and will be called automatically on those exit conditions.
##
function clean_up() {
    cf logout
}

##
## Logs in to the target CloudFoundry API endpoint as the user provided by the
## environment.
##
## INPUT(S):
##  $1: cf_api
##
function cf_login() {
    # TODO remove skip-ssl-validation when all the certs are valid
    cf api "$1" --skip-ssl-validation

    # For the high security/isolation segment foundations, logging in with the org and space fails ... for some reason.
    if [ -z "$ISOLATION_SEGMENT" ]; then
       cf login -u "${CF_USERNAME}" -p "${CF_PASSWORD}" || error_exit "$LINENO: Unable to log into $1" $?
    else
       cf login -u "${CF_USERNAME}" -p "${CF_PASSWORD}" -o "${CF_ORG}" -s "${CF_SPACE}" || error_exit "$LINENO: Unable to log into $1" $?
    fi
}

##
## Determine the current active "color" of the application being deployed.  It
## is possible that this is the very first deployment of the application and
## it will not be able to determine it.
##
## INPUT(S):
##  $1: app_name_env - the app name plus the target environment (ex. myapp-dev)
##  $2: domain - the domain of the route to check
##
function determine_active_color() {
    local determined_color
    determined_color=$(cf routes | awk -v route="^${1}\$" -v domain="^${2}\$" '$2 ~ route && $3 ~ domain && $4 ~ /green$/ { print "green" } $2 ~ route && $3 ~ domain && $4 ~ /blue$/ { print "blue" }')
    echo "${determined_color}"
}

##
## Determine the alternate "color" of the application being deployed.  This is
## simply just by providing the opposite of the current color.
##
## INPUT(S):
##  $1: input_color - the color to find the opposite of
##
## OUTPUT:
##  output_color - the alternate color of the input_color
##
function determine_alt_color() {
    if [ "${1}" == "blue" ]; then
        echo "green"
    else
        echo "blue"
    fi
}

##
## Determine the current number of instances that are running before the
## cut over so that the new application can be scaled up to be able to handle
## the current load.
##
## INPUT(S):
##  $1: app_name - the current application name
##
## OUTPUT:
##  instance_count - the current number of application instances
##
function determine_active_scale() {
    local instance_count
    instance_count=$(cf scale "${1}" | grep instances | cut -d' ' -f2)
    if ! [[ "$instance_count" =~ ^[0-9]+$ ]] ; then
        echo "1"
    else
        echo "${instance_count}"
    fi
}

##
## Check for for an existing app route (or create one if it does not exist).
##
## INPUT(S):
##  $1: host - the host name of the route to check
##  $2: domain - the domain of the route to check
##
function check_primary_route() {
    local cf_route_exists
    cf_route_exists=$(cf check-route "$1" "$2" || error_exit "$LINENO: Unable to verify route with host ${1} on ${2}" $?)

    if [[ "${cf_route_exists}" == *"not exist"* ]]; then
        echo "Creating route: create-route ${CF_SPACE} $2 -n $1"
        cf create-route "${CF_SPACE}" "$2" -n "$1" || error_exit "$LINENO: Unable to create primary route" $?
    fi
}

##
## Binds the google services to your application
##
## INPUT(S):
## $1: app_name - the application name to bind service to
## $2: service_name - the service name for the google services
##
function bind_google_service(){
    echo "##teamcity[progressStart 'Bind google service $2 to $1']"
    case "${2}" in
        *"pubsub"*)
            role="pubsub.editor"
            ;;
        *"storage"*)
            role="storage.objectAdmin"
            ;;
        *)
            echo "WARNING: Service ${2} is not currently supported, skipping..."
            return 0
            ;;
    esac
    cf bind-service "$1" "$2" -c "{\"role\":\"${role}\"}"
    echo "##teamcity[progressFinish 'Bind google service $2 to $1']"
}

##
## Pushes target application artifact to CloudFoundry.
##
## INPUT(S):
##  $1: app_name - the application name to use
##  $2: cf_domain - the target CloudFoundry domain
##  $3: path - the path to app directory or to a zip file of the contents of the app directory
##  $4: manifest_path - the path to the manifest
##
function push_app() {
    echo "##teamcity[progressStart 'cf-push $1 to $2']"
    cf push "$1" -d "$2" -p "$3" -f "$4" --no-start || { local exit_code=$?; cf logs "$1" --recent; error_exit "$LINENO: Unable to start $1 on $2" ${exit_code}; }
    if [ -z "${SPRING_PROFILES_ACTIVE}" ]; then
        echo "Spring Profile variable not passed, assuming cloud profile as active"
        cf set-env "$1" SPRING_PROFILES_ACTIVE "cloud"
    else
        cf set-env "$1" SPRING_PROFILES_ACTIVE "${SPRING_PROFILES_ACTIVE}"
    fi
    if [ -n "${GCP_SERVICES}" ]; then
        echo "##teamcity[progressStart 'Binding Google Services']"
        IFS=", " read -r -a  gcp_services_array <<< $GCP_SERVICES
        for gcp_service in "${gcp_services_array[@]}"; do
            bind_google_service $1 $gcp_service
        done
        echo "##teamcity[progressFinish 'Binding Google Services']"
    fi
    cf start "$1"
    echo "##teamcity[progressFinish 'cf-push $1 to $2']"
}

##
## Scales the application to a specified number of instances.
## Apps should only be scaled when the current(outgoing) number of instances is greater than the number for the new(incoming) app
##
## INPUT(S):
##  $1: app_name - the application name to use
##  $2: instance_count - the number of instances to scale to
##
function scale_app() {
    echo "##teamcity[progressStart 'cf-scale $1 to $2']"
    local new_app_instance_count
    new_app_instance_count=$(determine_active_scale $1)

    local log_message

    if [ "$2" -gt "$new_app_instance_count" ]; then
      cf scale "${1}" -i "${2}" || { local exit_code=$?; cf logs "$1" --recent; error_exit "$LINENO: Unable to scale $1 to $2" ${exit_code}; }
      log_message="cf-scale $1 to $2"
    else
      log_message="App $1 not scaled because current scale is $new_app_instance_count and previous scale = $2"
    fi

    echo "##teamcity[progressFinish '$log_message']"
}

##
## Perform associate "smoke" testing.  If these tests fail, the script should
## stop and exit with an error code.
##
## INPUT(S):
##  $1: app_name - the application name to use
##  $2: cf_domain - the target CloudFoundry domain
##
function smoke_test() {
    echo "##teamcity[progressStart 'smoke-test $1 on $2']"
    "${DIR_NAME}"/cf-smoke.sh "${1}" "${2}"
    echo "##teamcity[progressFinish 'smoke-test $1 on $2']"
}

##
## Create an autoscaler service if one doesn't already exist.
##
## INPUT(S):
##  $1: app_name - the application name to use
##  $2: app_name_alt - the application name to use
##
function create_autoscaler_service() {
  echo "##teamcity[progressStart 'create_autoscaler_service $1-autoscaler']"
  local autoscaler_service_count
  autoscaler_service_count=$(cf services | awk '{print $2}' | grep app-autoscaler | wc -l || true)

  if [[ autoscaler_service_count -eq 0 ]]; then
    cf create-service app-autoscaler standard "${1}-autoscaler" || { local exit_code=$?; cf logs "$1" --recent; error_exit "$LINENO: Unable to create $1-autoscaler service for $1" ${exit_code}; }
  fi
  echo "##teamcity[progressFinish 'create_autoscaler_service $1-autoscaler']"
}

##
## Bind app to the autoscaler service.
##
## INPUT(S):
##  $1: app_name - the application name to use
##  $2: app_name_alt - the application name to use
##
function bind_autoscaler_service() {
  echo "##teamcibty[progressStart 'bind_autoscaler_service $1-autoscaler']"

  cf bind-service "${2}" "${1}-autoscaler" || { local exit_code=$?; cf logs "$1" --recent; error_exit "$LINENO: Unable to bind $1-autoscaler service to $1" ${exit_code}; }

  echo "##teamcity[progressFinish 'bind_autoscaler_service $1-autoscaler']"
}

##
## Install the cf cli autoscaler plugin if it isn't present
##
function install_autoscaler_plugin() {
  echo "##teamcibty[progressStart 'install autoscaler cf plugin']"

  local autoscaler_plugin_count
  autoscaler_plugin_count=$(cf plugins | grep configure-autoscaling | wc -l || true)

  if [[ autoscaler_plugin_count -eq 0 ]]; then
    curl -SL http://artifactory.kroger.com/artifactory/kroger-cloud-generic/pcfbits/autoscaler-for-pcf-cliplugin-linux64-binary-2.0.40 > /tmp/plugin || { local exit_code=$?; cf logs "$1" --recent; error_exit "$LINENO: Unable to download autoscaler plugin" ${exit_code}; }
    yes | cf install-plugin /tmp/plugin || { local exit_code=$?; cf logs "$1" --recent; error_exit "$LINENO: Unable to install autoscaler plugin" ${exit_code}; }
  fi

  echo "##teamcity[progressFinish 'install autoscaler cf plugin completed']"
}

##
## The "main" method for the cf-deploy.sh script.  This script acts as a
## simple reference for a basic blue-green deployments.  The script first
## loops over all target CloudFoundry domains and pushes the application as a
## new "alternate" color.
##
## Once the application is successfully started and smoke tested on all
## domains, the script maps the primary application route to the new color
## route and then un-maps and stops the old application.
##
## INPUT(S):
##  $1: artifact
##  $2: manifest
##  $3: target_env
##
function main() {
    local artifact="${1:?"Usage: ${SCRIPT_NAME} [artifact] [manifest] [env]"}"
    local manifest="${2:?"Usage: ${SCRIPT_NAME} [artifact] [manifest] [env]"}"
    local target_env="${3:?"Usage: ${SCRIPT_NAME} [artifact] [manifest] [env]"}"

    validate_env

    install_autoscaler_plugin

    local active_color
    local app_name_alt
    local app_name_env="${CF_APPNAME}"
    # Strip 'prod' from app name if present
    local vanity_app_name="${CF_APPNAME%prod}"

    echo "##teamcity[progressStart 'cf-deploy-sh']"

    # split comma separated CF_DOMAINS into an array
    IFS=',' read -r -a cf_domain_array <<< "${CF_DOMAINS}"

    for cf_domain in "${cf_domain_array[@]}"
    do
        local route_domain="kroger.com"

        if [ "${cf_domain}" == "ocf.kroger.com" ]; then
            route_domain="ocf.kroger.com"
        fi

        #cf_login "https://api.${cf_domain}"
        cf_login "https://${CF_API_PREFIX}.${cf_domain}"

        if [ ! -z "$ISOLATION_SEGMENT" ]; then
            IFS=". " read -r -a domains <<< $cf_domain
            cf_domain="${domains[0]}$ISOLATION_SEGMENT.${route_domain}"
            if [[ $ISOLATION_SEGMENT = "0" ]]; then
                COMPLIANCE="PCI"
            elif [[ $ISOLATION_SEGMENT = "1" ]]; then
                COMPLIANCE="PHI"
            else
              echo "Invalid ISOLATION_SEGMENT value = ${ISOLATION_SEGMENT}"
            fi
        fi

        active_color=$(determine_active_color "${vanity_app_name}" "${route_domain}")
        app_name_alt="${app_name_env}-$(determine_alt_color "${active_color}")"

        echo "Next application is: ${app_name_alt}"

        if [ ! -z "$CF_APP_PREFIX" ]; then
            cf_domain=${CF_APP_PREFIX}.${cf_domain}
        fi

        check_primary_route "${app_name_env}" "${cf_domain}"
        check_primary_route "${vanity_app_name}" "${route_domain}"

        cf delete "${app_name_alt}" -r -f
        create_autoscaler_service "${vanity_app_name}" "${app_name_alt}"
        push_app "${app_name_alt}" "${cf_domain}" "${artifact}" "${manifest}"

        if [ "${active_color}" != "" ]; then
            local app_name_current="${app_name_env}-${active_color}"
            scale_app "${app_name_alt}" "$(determine_active_scale "${app_name_current}")"
        fi

        smoke_test "${app_name_alt}" "${cf_domain}"

        bind_autoscaler_service "${vanity_app_name}" "${app_name_alt}"
        cf configure-autoscaling "${app_name_alt}" "${DIR_NAME}"/autoscaler-manifest.yml
    done

    for cf_domain in "${cf_domain_array[@]}"
    do
        cf_login "https://${CF_API_PREFIX}.${cf_domain}"

        if [ ! -z "$ISOLATION_SEGMENT" ]; then
            IFS=". " read -r -a domains <<< $cf_domain
            cf_domain="${domains[0]}$ISOLATION_SEGMENT.${route_domain}"
            if [[ $ISOLATION_SEGMENT = "0" ]]; then
                COMPLIANCE="PCI"
            elif [[ $ISOLATION_SEGMENT = "1" ]]; then
                COMPLIANCE="PHI"
            else
                echo "Invalid ISOLATION_SEGMENT value = ${ISOLATION_SEGMENT}"
            fi
        fi

        if [ ! -z "$CF_APP_PREFIX" ]; then
            cf_domain=${CF_APP_PREFIX}.${cf_domain}
        fi

        active_color=$(determine_active_color "${vanity_app_name}" "${route_domain}")
        app_name_alt="${app_name_env}-$(determine_alt_color "${active_color}")"

        echo "Deploy succeeded, mapping primary route to '${app_name_alt}'"
        cf map-route "${app_name_alt}" "${cf_domain}" -n "${app_name_env}" || error_exit "$LINENO: Unable to map primary route" $?
        cf map-route "${app_name_alt}" "${route_domain}" -n "${vanity_app_name}" || error_exit "$LINENO: Unable to map vanity route" $?

        if [ "${active_color}" == "" ]; then
          echo "This is an initial deploy, so there is no previous route to unmap."
        else
          local app_name_current="${app_name_env}-${active_color}"
          echo "Un-mapping and stopping the previous route at '${app_name_current}'"
          cf unmap-route "${app_name_current}" "${cf_domain}" -n "${app_name_env}" || error_exit "$LINENO: Unable to unmap old primary route" $?
          cf unmap-route "${app_name_current}" "${route_domain}" -n "${vanity_app_name}" || error_exit "$LINENO: Unable to unmap old vanity route" $?
          cf stop "${app_name_current}" || error_exit "$LINENO: Unable to stop old app ${app_name_current}" $?
        fi
    done

    echo "##teamcity[progressFinish 'cf-deploy-sh']"
}

##
trap clean_up INT TERM EXIT
main "$@"