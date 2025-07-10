package com.ecommerce.minimalist.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api")
public interface ProductApi {

    @GetMapping("/products")
    ResponseEntity<String> getAllProducts();

    @GetMapping("/products/{id}")
    ResponseEntity<String> getProductById(@PathVariable("id") String id);
}


