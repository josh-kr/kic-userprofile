
# Springboot / Angular Project


## Architecture:
* Server:
    * Springboot, EAF
    * https://confluence.kroger.com/confluence/display/EAF/Home
    * Upgrade guide issues:
      * https://confluence.kroger.com/confluence/pages/viewpage.action?pageId=345552213
      * https://confluence.kroger.com/confluence/display/EAF/Migrate+To+EAF+5.7.1+Code
      * 
* Client:
  * Angular 7+
  * https://update.angular.io/
  

## How to run:
* Clone repository
* Navigate to directory via commandline
* Run Command `mvn clean install` on base directory. To build/compile the java jar which contains the server and the client embeded.
* To run the server, run the `jar` file located in the profile-server/target/.
  * `java -jar profile-server/target/profile-server-0.0.1-SNAPSHOT.jar`
* Navigate to `http://localhost:8080` in your browser.
  * You are now running the deployable jar file. This is identical to what would be running in rancher.
* To run the client durign local UI development, in a separate terminal navigate to the `profile-client` directory and run `npm run start`
  * You can now navigate to `http://localhost:4200`. The client will be using localhost:8080 as the server, now you take advantage of Angular development servers live reload while doing development.
