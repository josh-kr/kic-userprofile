package com.kroger.car.car.domain;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

import lombok.Data;

@NotNull
@Data
@Entity
public class Car
{
    @Id
    private String vin;
    private String make;
    private String model;
    private int year;
    private String color;

	public void updateProperties(Car other) {
		this.make = other.make;
		this.model = other.model;
		this.year = other.year;
		this.color = other.color;
	}
}