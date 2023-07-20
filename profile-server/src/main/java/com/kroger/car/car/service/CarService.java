package com.kroger.profile.car.service;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kroger.profile.car.domain.Car;
import com.kroger.profile.car.repository.CarRepository;
import com.kroger.commons.data.DataMap;
import com.kroger.commons.data.DataResponse;
import com.kroger.commons.data.filter.SortAndFilterRequest;
import com.kroger.commons.error.exception.NotFoundException;

@Transactional
@Service
public class CarService {
	public static final String RESOURCE_NAME = "cars";

	public static final int DEFAULT_PAGE_SIZE = 10;

	@Autowired
	protected CarRepository carRepository;

	@Transactional(readOnly = true)
	public DataResponse<DataMap> getCars(SortAndFilterRequest<Car, Specification<Car>> sortAndFilterRequest) {
		Specification<Car> specification = sortAndFilterRequest.getFilter();
		Sort sort = sortAndFilterRequest.getSort().orElse(Sort.unsorted());
		Pageable pageable = sortAndFilterRequest.getPageable().orElse(PageRequest.of(0, DEFAULT_PAGE_SIZE, sort));
		Page<Car> page = carRepository.findAll(specification, pageable);
		return DataResponse.builder(DataMap.of(RESOURCE_NAME, page.getContent())).meta().page(pageable).sort(sort)
				.totals(page).and().build();
	}

	public DataResponse<DataMap> getCar(String vin) {
		Car car = carRepository.findById(vin).orElseThrow(() -> new NotFoundException("Car not found"));
		return DataResponse.builder(DataMap.of(RESOURCE_NAME, Arrays.asList(car))).build();
	}

	public DataResponse<DataMap> createCar(Car car) {
		car = carRepository.save(car);
		return DataResponse.builder(DataMap.of(RESOURCE_NAME, Arrays.asList(car))).build();
	}

	public DataResponse<DataMap> updateCar(Car updatedCar) {
		Car car = carRepository.findById(updatedCar.getVin()).orElseThrow(() -> new NotFoundException("Car not found"));
		car = carRepository.save(car);
		return DataResponse.builder(DataMap.of(RESOURCE_NAME, Arrays.asList(car))).build();
	}

	public void deleteCar(String vin) {
		Car car = carRepository.findById(vin).orElseThrow(() -> new NotFoundException("Car not found"));
		carRepository.deleteById(car.getVin());
	}
}
