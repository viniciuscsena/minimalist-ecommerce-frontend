
package com.ecommerce.minimalist.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api")
public interface AuthApi {

    @PostMapping("/auth/login")
    ResponseEntity<String> login(@RequestBody String credentials);

    @PostMapping("/auth/register")
    ResponseEntity<String> register(@RequestBody String userData);
}


