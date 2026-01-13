
package com.ecommerce.minimalist.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api")
public interface CartApi {

    @PostMapping("/cart")
    ResponseEntity<String> addItemToCart(@RequestBody String itemData);

    @GetMapping("/cart")
    ResponseEntity<String> getCart();

    @DeleteMapping("/cart/{itemId}")
    ResponseEntity<String> removeItemFromCart(@PathVariable("itemId") String itemId);
}


