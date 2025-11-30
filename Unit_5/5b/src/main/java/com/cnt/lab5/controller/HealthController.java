package com.cnt.lab5.controller;

import com.cnt.lab5.models.ApiResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class HealthController {

    @GetMapping("/")
    public ApiResponse getInfo() {
        return ApiResponse.builder()
                .status(200)
                .message("Service is running successfully.")
                .timestamp(new Date())
                .build();
    }
}
