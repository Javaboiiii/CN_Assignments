package com.cnt.lab5.service;

import com.cnt.lab5.models.Result;
import com.cnt.lab5.models.Subject;
import com.cnt.lab5.repository.ResultRepository;
import com.cnt.lab5.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResultService {

    @Autowired
    private ResultRepository resultRepository;

    @Autowired
    private SubjectRepository subjectRepository;


    public Result computeAndSaveResult(List<Integer> subjectIds) {
        List<Subject> subjects = subjectRepository.findAllById(subjectIds);

        int totalMarks = subjects.stream().mapToInt(Subject::getMarks).sum();
        int maxMarks = subjects.size() * 100;
        double percent = ((double) totalMarks / maxMarks) * 100;
        double cgpa = percent / 9.5;

        Result result = new Result();
        result.setSubjects(subjects);
        result.setPercent(percent);
        result.setCGPA(cgpa);

        return resultRepository.save(result);
    }

    public List<Result> getAllResults() {
        return resultRepository.findAll();
    }

    public Result getResultById(Integer id) {
        return resultRepository.findById(id).orElse(null);
    }
}
