//package com.kroger.car.car.config;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.Ordered;
//
//import com.fasterxml.classmate.TypeResolver;
//import com.kroger.commons.data.DataMap;
//import com.kroger.commons.data.DataResponse;
//import com.kroger.commons.data.filter.SortAndFilterRequest;
//import com.kroger.commons.swagger.DocketConfigurer;
//
//import springfox.documentation.schema.AlternateTypeRules;
//import springfox.documentation.spring.web.plugins.Docket;
//
//@Configuration
//public class SwaggerConfiguration {
//	@Autowired
//	private TypeResolver typeResolver;
//
//	@Bean
//	public DocketConfigurer docketConfigurer() {
//		return new DocketConfigurer() {
//			@Override
//			public void configure(Docket docket) {
//				docket.ignoredParameterTypes(SortAndFilterRequest.class);
//				// Convert DataResponseOfMapOfCars placeholder object back to map of Cars
//				docket.alternateTypeRules(AlternateTypeRules.newRule(
//						typeResolver.resolve(CarController.DataResponseOfMapOfCars.class),
//
//						typeResolver.resolve(DataResponse.class, typeResolver.resolve(DataMapOfCars.class)),
//						Ordered.HIGHEST_PRECEDENCE));
//				// Then hide the type erased version
//				docket.alternateTypeRules(AlternateTypeRules.newRule(
//						typeResolver.resolve(DataResponse.class, typeResolver.resolve(DataMap.class)),
//
//						typeResolver.resolve(Void.class), Ordered.HIGHEST_PRECEDENCE));
//			}
//		};
//	}
//}
