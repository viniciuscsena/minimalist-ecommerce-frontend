
package com.ecommerce.minimalist.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api")
public interface CheckoutApi {

    @PostMapping("/checkout")
    ResponseEntity<String> processCheckout(@RequestBody String checkoutData);

    @PostMapping("/guest-checkout")
    ResponseEntity<String> processGuestCheckout(@RequestBody String guestCheckoutData);

    @GetMapping("/orders/{orderId}")
    ResponseEntity<String> getOrderDetails(@PathVariable("orderId") String orderId);
}


