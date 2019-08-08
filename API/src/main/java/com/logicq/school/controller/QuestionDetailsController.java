package com.logicq.school.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logicq.school.model.ChapterDetails;
import com.logicq.school.model.ClassDetails;
import com.logicq.school.model.Question;
import com.logicq.school.model.SubjectDetails;
import com.logicq.school.model.TopicDetails;
import com.logicq.school.repository.ChapterDetailsRepo;
import com.logicq.school.repository.ClassesDetailsRepo;
import com.logicq.school.repository.QuestionDetailsRepo;
import com.logicq.school.repository.SubjectDetailsRepo;
import com.logicq.school.repository.TopicDetailsRepo;
import com.logicq.school.utils.SchoolDateUtils;

@RestController
@EnableAutoConfiguration
@RequestMapping("/api/question")
public class QuestionDetailsController {

	@Autowired
	QuestionDetailsRepo questionDetailsRepo;

	@Autowired
	SubjectDetailsRepo subjectDetailsRepo;

	@Autowired
	ChapterDetailsRepo chapterDetailsRepo;

	@Autowired
	TopicDetailsRepo topicDetailsRepo;

	@Autowired
	ClassesDetailsRepo classesDetailsRepo;

	@Autowired
	SchoolDateUtils schoolDateUtils;

	@RequestMapping(value = "/{questionFor}/{questionForValue}", method = RequestMethod.GET)
	public ResponseEntity<List<Question>> getQuestionList(@RequestParam String questionFor, String questionForValue)
			throws Exception {
		List<Question> questionList = questionDetailsRepo.findByQuestionForAndQuestionForValue(questionFor,
				questionForValue);
		return new ResponseEntity<List<Question>>(questionList, HttpStatus.OK);
	}

	@RequestMapping(value = "/day0/setup", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Question>> setupDayZeroForTopic() throws Exception {
		File file = ResourceUtils.getFile("classpath:question.txt");
		Set<String> questionLines = Files.lines(Paths.get(file.getAbsolutePath())).distinct()
				.collect(Collectors.toSet());
		List<Question> questionList = new ArrayList<>();
		if (!questionLines.isEmpty()) {
			questionDetailsRepo.deleteAll();
			questionLines.forEach(qeslin -> {
				Question question = new Question();
				String[] wordList = qeslin.split("#");
				if ("CLASS".equals(wordList[0])) {
					ClassDetails classDetails = classesDetailsRepo.findByName(wordList[1].toLowerCase().trim());
					question.setQuestionFor("CLASS");
					question.setQuestionFor(String.valueOf(classDetails.getId()));
					question.setFileURL(wordList[2]);
					question.setFileType(wordList[3]);
					question.setLastUpdate(schoolDateUtils.findTodayStartDate());
					questionList.add(question);

				}
				if ("SUBJECT".equals(wordList[0])) {
					ClassDetails classDetails = classesDetailsRepo.findByName(wordList[1].toLowerCase().trim());
					SubjectDetails subj = subjectDetailsRepo.findByClassIdAndName(classDetails.getId(),
							wordList[2].toLowerCase().trim());
					question.setQuestionFor("SUBJECT");
					question.setQuestionFor(String.valueOf(subj.getId()));
					question.setFileURL(wordList[3]);
					question.setFileType(wordList[4]);
					question.setLastUpdate(schoolDateUtils.findTodayStartDate());
					questionList.add(question);

				}
				if ("CHAPTER".equals(wordList[0])) {
					ClassDetails classDetails = classesDetailsRepo.findByName(wordList[1].toLowerCase().trim());
					SubjectDetails subj = subjectDetailsRepo.findByClassIdAndName(classDetails.getId(),
							wordList[2].toLowerCase().trim());
					ChapterDetails chapter = chapterDetailsRepo.findByClassIdAndSubjectIdAndName(subj.getClassId(),
							subj.getId(), wordList[3].toLowerCase().trim());

					question.setQuestionFor("CHAPTER");
					question.setQuestionFor(String.valueOf(chapter.getId()));
					question.setFileURL(wordList[4]);
					question.setFileType(wordList[5]);
					question.setLastUpdate(schoolDateUtils.findTodayStartDate());
					questionList.add(question);

				}
				if ("TOPIC".equals(wordList[0])) {

					ClassDetails classDetails = classesDetailsRepo.findByName(wordList[1].toLowerCase().trim());
					SubjectDetails subj = subjectDetailsRepo.findByClassIdAndName(classDetails.getId(),
							wordList[2].toLowerCase().trim());
					ChapterDetails chapter = chapterDetailsRepo.findByClassIdAndSubjectIdAndName(subj.getClassId(),
							subj.getId(), wordList[3].toLowerCase().trim());

					TopicDetails topic = topicDetailsRepo.findByClassIdAndSubjectIdAndChapterIdAndName(
							classDetails.getId(), subj.getId(), chapter.getId(), wordList[4].toLowerCase().trim());

					question.setQuestionFor("TOPIC");
					question.setQuestionFor(String.valueOf(topic.getId()));
					question.setFileURL(wordList[5]);
					question.setFileType(wordList[6]);
					question.setLastUpdate(schoolDateUtils.findTodayStartDate());
					questionList.add(question);
				}

			});

			if (!questionList.isEmpty()) {
				questionDetailsRepo.save(questionList);
			}
		}

		return new ResponseEntity<List<Question>>(questionList, HttpStatus.OK);
	}
}
