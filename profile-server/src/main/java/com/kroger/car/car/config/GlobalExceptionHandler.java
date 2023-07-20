package com.kroger.profile.car.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.kroger.commons.error.AbstractGlobalExceptionHandler;
import com.kroger.commons.error.ApiError;
import com.kroger.commons.error.EnableMissingWebRouteSupport;

import brave.Tracer;

@RestControllerAdvice
@EnableMissingWebRouteSupport
public class GlobalExceptionHandler extends AbstractGlobalExceptionHandler
{
    public GlobalExceptionHandler(@Autowired(required = false)Tracer tracer)
    {
        super(tracer);
    }

    @ExceptionHandler(org.springframework.data.mapping.PropertyReferenceException.class)
    public ResponseEntity<ApiError> handleHttpExceptions(org.springframework.data.mapping.PropertyReferenceException ex,
                                                         WebRequest webRequest)
    {
        ApiError apiError = ApiError.of(HttpStatus.BAD_REQUEST,
                ex.getLocalizedMessage());
        addTraceContext(apiError);
        return new ResponseEntity<>(apiError, HttpStatus.BAD_REQUEST);
    }

}