package com.cnt.lab5.controller;

import com.cnt.lab5.models.Result;
import com.cnt.lab5.service.ResultService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/results")
public class ResultController {

    private final ResultService service;

    public ResultController(ResultService service) {
        this.service = service;
    }

    @PostMapping
    public Result computeResult(@RequestBody List<Integer> subjectIds) {
        return service.computeAndSaveResult(subjectIds);
    }

    @GetMapping
    public List<Result> getAllResults() {
        return service.getAllResults();
    }

    @GetMapping("/{id}")
    public Result getResultById(@PathVariable Integer id) {
        return service.getResultById(id);
    }
}
