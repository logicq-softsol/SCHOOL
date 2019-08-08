package com.logicq.school.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.logicq.school.model.Question;

@Repository
public interface QuestionDetailsRepo extends JpaRepository<Question, Long> {

	List<Question> findByQuestionFor(String questionFor);

	List<Question> findByQuestionForAndQuestionForValue(String questionFor, String questionForValue);
}
