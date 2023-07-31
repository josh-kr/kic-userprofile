package com.kroger.car.car.repository;

import com.kroger.car.car.domain.Car;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;


@Repository
public interface CarRepository extends JpaRepository<Car, String>, JpaSpecificationExecutor<Car>
{
    Page<Car> findAll(Specification<Car> specification, Pageable pageable);
}
