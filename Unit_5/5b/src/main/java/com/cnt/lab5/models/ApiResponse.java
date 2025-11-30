package com.cnt.lab5.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse {

    private Integer status;
    private String message;
    private Date timestamp;
}
