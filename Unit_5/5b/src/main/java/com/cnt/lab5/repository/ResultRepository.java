package com.cnt.lab5.repository;

import com.cnt.lab5.models.Result;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ResultRepository extends CrudRepository<Result, Integer> {

    List<Result> findAll();
}
