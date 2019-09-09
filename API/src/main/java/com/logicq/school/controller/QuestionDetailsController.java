package com.logicq.school.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.logicq.school.model.ClassDetails;
import com.logicq.school.model.Favorites;
import com.logicq.school.model.LoginDetails;
import com.logicq.school.model.Question;
import com.logicq.school.repository.QuestionDetailsRepo;
import com.logicq.school.utils.SchoolDateUtils;
import com.logicq.school.vo.QuestionVO;

@RestController
@EnableAutoConfiguration
@RequestMapping("/api/question")
public class QuestionDetailsController {

	@Autowired
	QuestionDetailsRepo questionDetailsRepo;

	@Autowired
	SchoolDateUtils schoolDateUtils;

	@RequestMapping(value = "/{name}/{questionFor}", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<QuestionVO> setupDayZeroForTopic(@PathVariable String name, @PathVariable Long questionFor,
			@RequestBody QuestionVO questionVO) throws Exception {

		ObjectMapper jsonMapper = new ObjectMapper();
		Question question = new Question();
		question.setName(name);
		question.setQuestionFor(questionFor);
		question.setType(questionVO.getType());
		question.setQuestions(jsonMapper.writeValueAsBytes(question));
		questionDetailsRepo.save(question);

		return new ResponseEntity<QuestionVO>(questionVO, HttpStatus.OK);
	}

	@RequestMapping(value = "/{name}/{questionFor}", method = RequestMethod.GET)
	public ResponseEntity<List<QuestionVO>> getClassDetail(@PathVariable String name, @PathVariable Long questionFor)
			throws Exception {
		ObjectMapper jsonMapper = new ObjectMapper();
		List<QuestionVO> questionVos = new ArrayList<QuestionVO>();
		List<Question> questionList = questionDetailsRepo.findByQuestionForAndName(questionFor, name);
		if (!questionList.isEmpty()) {
			questionList.forEach(ques -> {
				QuestionVO quVO = jsonMapper.convertValue(ques.getQuestions(), QuestionVO.class);
				questionVos.add(quVO);
			});

		}

		return new ResponseEntity<List<QuestionVO>>(questionVos, HttpStatus.OK);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Question> removeFavorites(@PathVariable Long id) throws Exception {
		Question question = questionDetailsRepo.findOne(id);
		questionDetailsRepo.delete(id);
		return new ResponseEntity<Question>(question, HttpStatus.OK);
	}

}
