package com.kroger.profile.car.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.kroger.profile.car.domain.Car;
import com.kroger.profile.car.domain.CarValidator;
import com.kroger.profile.car.repository.CarRepository;
import com.kroger.profile.car.service.CarService;
import com.kroger.commons.data.DataMap;
import com.kroger.commons.data.DataResponse;
import com.kroger.commons.data.filter.SortAndFilterRequest;
import com.kroger.commons.error.ApiError;
import com.kroger.commons.swagger.SwaggerProperties;
import com.kroger.commons.swagger.styleguide.ApiSortAndFilterParams;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.Authorization;

@Api
@RestController
@RequestMapping("/api/cars")
public class CarController
{
    @Autowired
    protected CarRepository carRepository;

	@Autowired
	protected CarValidator carValidator;

	@Autowired
	protected CarService carService;

	@ApiOperation(value = "Get Cars", notes = "Get Cars", authorizations = {
			// @Authorization(value = SwaggerProperties.BASIC_AUTH_SCHEME_NAME),
			// @Authorization(value = SwaggerProperties.API_KEY_SCHEME_NAME),
			@Authorization(value = SwaggerProperties.OAUTH2_SCHEME_NAME) }, response = DataResponseOfMapOfCars.class)
	@ApiSortAndFilterParams(supportsProjections = true, value = {
			@ApiImplicitParam(name = "filter.vin", value = "Filter By VIN", paramType = "query"),
			@ApiImplicitParam(name = "filter.make", value = "Filter By Make", paramType = "query"),
			@ApiImplicitParam(name = "filter.make.like", value = "Filter By Make", paramType = "query") })
	@GetMapping
	// @PreAuthorize("permitAll()")
	public ResponseEntity<DataResponse<DataMap>> getCars(
			SortAndFilterRequest<Car, Specification<Car>> sortAndFilterRequest) {
		DataResponse<DataMap> dataResponse = carService.getCars(sortAndFilterRequest);
		return dataResponse.respondWith().entity(ResponseEntity.ok());
	}

    @ApiOperation(value = "Get Car By VIN", notes = "Get Car By VIN", authorizations = {
            //@Authorization(value = SwaggerProperties.BASIC_AUTH_SCHEME_NAME),
            //@Authorization(value = SwaggerProperties.API_KEY_SCHEME_NAME),
            @Authorization(value = SwaggerProperties.OAUTH2_SCHEME_NAME) },
            response = DataResponseOfMapOfCars.class)
    @GetMapping("{id}")
    //@PreAuthorize("permitAll()")
    public ResponseEntity<DataResponse<DataMap>> getCar(@PathVariable String vin)
    {
        DataResponse<DataMap> dataResponse = carService.getCar(vin);
        return dataResponse.respondWith().entity(ResponseEntity.ok());
    }

    @ApiOperation(value = "Add Car", notes = "Add Car", authorizations = {
            //@Authorization(value = SwaggerProperties.BASIC_AUTH_SCHEME_NAME),
            //@Authorization(value = SwaggerProperties.API_KEY_SCHEME_NAME),
            @Authorization(value = SwaggerProperties.OAUTH2_SCHEME_NAME) },
            response = DataResponseOfMapOfCars.class)
    @PostMapping
    public ResponseEntity<DataResponse<DataMap>> createCar(
            @RequestBody @Valid Car newCar, BindingResult bindingResult)
            throws BindException
    {
    	carValidator.validateNewCar(newCar, bindingResult);
        ApiError.throwExceptionIfHasErrors(bindingResult);
        DataResponse<DataMap> dataResponse = carService.createCar(newCar);
        return dataResponse.respondWith().entity(ResponseEntity.created(null));
    }

    @ApiOperation(value = "Update Car", notes = "Update Car", authorizations = {
            //@Authorization(value = SwaggerProperties.BASIC_AUTH_SCHEME_NAME),
            //@Authorization(value = SwaggerProperties.API_KEY_SCHEME_NAME),
            @Authorization(value = SwaggerProperties.OAUTH2_SCHEME_NAME) },
            response = DataResponseOfMapOfCars.class)
    @PutMapping
    public ResponseEntity<DataResponse<DataMap>> updateCar(
            @RequestBody @Valid Car updatedCar, BindingResult bindingResult)
            throws BindException
    {
    	carValidator.validateExistingCar(updatedCar, bindingResult);
        ApiError.throwExceptionIfHasErrors(bindingResult);
        DataResponse<DataMap> dataResponse = carService.updateCar(updatedCar);
        return dataResponse.respondWith().entity(ResponseEntity.ok());
    }

    @ApiOperation(value = "Remove Car", notes = "Remove Car", authorizations = {
            //@Authorization(value = SwaggerProperties.BASIC_AUTH_SCHEME_NAME),
            //@Authorization(value = SwaggerProperties.API_KEY_SCHEME_NAME),
            @Authorization(value = SwaggerProperties.OAUTH2_SCHEME_NAME) })
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("{vin}")
    public ResponseEntity<Void> deleteCar(@PathVariable String vin)
    {
    	carService.deleteCar(vin);
        return ResponseEntity.noContent().build();
    }

    @ApiOperation(value = "Remove Car", notes = "Remove Car", authorizations = {
            //@Authorization(value = SwaggerProperties.BASIC_AUTH_SCHEME_NAME),
            //@Authorization(value = SwaggerProperties.API_KEY_SCHEME_NAME),
            @Authorization(value = SwaggerProperties.OAUTH2_SCHEME_NAME) })
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping
    public ResponseEntity<Void> deleteCarWithParam(@RequestParam("filter.vin") String vin)
    {
        return deleteCar(vin);
    }
    
	/**
	 * This class is used to map type erased class back to list of Cars
	 */
	public static class DataResponseOfMapOfCars {
		public DataMapOfCars data;
	}

	public static class DataMapOfCars {
		public List<Car> cars;
		public List<ApiError> errors;
	}
}
