package com.cnt.lab5.service;

import com.cnt.lab5.models.Subject;
import com.cnt.lab5.repository.SubjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {

    private final SubjectRepository repository;

    public SubjectService(SubjectRepository repository) {
        this.repository = repository;
    }

    public Subject create(Subject subject) {
        return repository.save(subject);
    }

    public List<Subject> getAll() {
        return repository.findAll();
    }

    public Subject getById(Integer id) {
        return repository.findById(id).orElse(null);
    }

    public Subject update(Integer id, Subject updated) {
        Subject existing = repository.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setName(updated.getName());
        existing.setMarks(updated.getMarks());
        return repository.save(existing);
    }

    public void delete(Integer id) {
        repository.deleteById(id);
    }
}
