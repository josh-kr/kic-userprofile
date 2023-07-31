package com.kroger.car.car.domain;

import static com.kroger.commons.data.validation.ObjectValidators.notNull;
import static com.kroger.commons.data.validation.StringValidators.notEmpty;
import static com.kroger.commons.data.validation.ValidationValue.with;
import static com.kroger.commons.data.validation.ValidationValue.withObject;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

@Component
public class CarValidator {

	public void validateNewCar(Car newCar, Errors errors) {
		validateBusinessProperties(newCar, errors);
	}

	public void validateExistingCar(Car existingCar, Errors errors) {
		validateBusinessProperties(existingCar, errors);
	}

	private void validateBusinessProperties(Car car, Errors errors) {
		withObject(car.getVin()).check(notNull()).rejectIfInvalid("vin", errors);
		with(car.getMake()).check(notEmpty()).rejectIfInvalid("make", errors);
		with(car.getModel()).check(notEmpty()).rejectIfInvalid("model", errors);
		with(car.getYear()).check(notNull()).rejectIfInvalid("year", errors);
		with(car.getColor()).check(notEmpty()).rejectIfInvalid("color", errors);
	}

}
