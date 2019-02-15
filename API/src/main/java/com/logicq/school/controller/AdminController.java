package com.logicq.school.controller;

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

import com.logicq.school.model.ChapterDetails;
import com.logicq.school.model.ClassDetails;
import com.logicq.school.model.SubjectDetails;
import com.logicq.school.repository.ChapterDetailsRepo;
import com.logicq.school.repository.ClassesDetailsRepo;
import com.logicq.school.repository.SubjectDetailsRepo;

@RestController
@EnableAutoConfiguration
@RequestMapping("/api/admin")
public class AdminController {

	@Autowired
	ClassesDetailsRepo classesDetailsRepo;

	@Autowired
	SubjectDetailsRepo subjectDetailsRepo;

	@Autowired
	ChapterDetailsRepo chapterDetailsRepo;

	@RequestMapping(value = "/classes", method = RequestMethod.GET)
	public ResponseEntity<List<ClassDetails>> getClassDetails() {
		return new ResponseEntity<List<ClassDetails>>(classesDetailsRepo.findAll(), HttpStatus.OK);
	}

	@RequestMapping(value = "/classes", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ClassDetails> addClassDetails(@RequestBody ClassDetails classDetails) throws Exception {
		classesDetailsRepo.save(classDetails);
		return new ResponseEntity<ClassDetails>(classDetails, HttpStatus.OK);
	}

	@RequestMapping(value = "/classes", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ClassDetails> updateClassDetails(@RequestBody ClassDetails classDetails) throws Exception {
		classesDetailsRepo.save(classDetails);
		return new ResponseEntity<ClassDetails>(classDetails, HttpStatus.OK);
	}

	@RequestMapping(value = "/classes/{classId}", method = RequestMethod.DELETE)
	public ResponseEntity<ClassDetails> deleteClassDetails(@PathVariable Long classId) throws Exception {
		classesDetailsRepo.delete(classId);
		return new ResponseEntity<ClassDetails>(new ClassDetails(), HttpStatus.OK);
	}

	@RequestMapping(value = "/subjects", method = RequestMethod.GET)
	public ResponseEntity<List<SubjectDetails>> getSubjectDetails() {
		return new ResponseEntity<List<SubjectDetails>>(subjectDetailsRepo.findAll(), HttpStatus.OK);
	}

	@RequestMapping(value = "/subjects/{classId}", method = RequestMethod.GET)
	public ResponseEntity<List<SubjectDetails>> getSubjectDetailsForClasses(@PathVariable Long classId) {
		return new ResponseEntity<List<SubjectDetails>>(subjectDetailsRepo.findByClassId(classId), HttpStatus.OK);
	}

	@RequestMapping(value = "/subjects", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SubjectDetails> addSubjectDetails(@RequestBody SubjectDetails subject) throws Exception {
		subjectDetailsRepo.save(subject);
		return new ResponseEntity<SubjectDetails>(subject, HttpStatus.OK);
	}

	@RequestMapping(value = "/subjects", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SubjectDetails> updateSubjectDetails(@RequestBody SubjectDetails subject) throws Exception {
		subjectDetailsRepo.save(subject);
		return new ResponseEntity<SubjectDetails>(subject, HttpStatus.OK);
	}

	@RequestMapping(value = "/subjects/{classId}/{subjectid}", method = RequestMethod.DELETE)
	public ResponseEntity<SubjectDetails> deleteSubjectDetails(@PathVariable Long classId, @PathVariable Long subjectId)
			throws Exception {
		subjectDetailsRepo.delete(subjectId);
		return new ResponseEntity<SubjectDetails>(new SubjectDetails(), HttpStatus.OK);
	}

	@RequestMapping(value = "/chapters", method = RequestMethod.GET)
	public ResponseEntity<List<ChapterDetails>> getChapterDetails() {
		return new ResponseEntity<List<ChapterDetails>>(chapterDetailsRepo.findAll(), HttpStatus.OK);
	}

	@RequestMapping(value = "/chapters/{classId}/{subjectId}", method = RequestMethod.GET)
	public ResponseEntity<List<ChapterDetails>> getChapterDetailsForClassAndSubject(@PathVariable Long classId,
			@PathVariable Long subjectId) {
		return new ResponseEntity<List<ChapterDetails>>(
				chapterDetailsRepo.findByClassIdAndSubjectId(classId, subjectId), HttpStatus.OK);
	}

	@RequestMapping(value = "/chapters/{classId}/{subjectId}/{chapterId}", method = RequestMethod.GET)
	public ResponseEntity<ChapterDetails> getChapterDetailsForClassAndSubject(@PathVariable Long classId,
			@PathVariable Long subjectId, @PathVariable Long chapterId) {
		return new ResponseEntity<ChapterDetails>(
				chapterDetailsRepo.findByClassIdAndSubjectIdAndId(classId, subjectId, chapterId), HttpStatus.OK);
	}

	@RequestMapping(value = "/chapters", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ChapterDetails> addChapterDetails(@RequestBody ChapterDetails chapter) throws Exception {
		chapterDetailsRepo.save(chapter);
		return new ResponseEntity<ChapterDetails>(chapter, HttpStatus.OK);
	}

	@RequestMapping(value = "/chapters", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ChapterDetails> updateChapterDetails(@RequestBody ChapterDetails chapter) throws Exception {
		chapterDetailsRepo.save(chapter);
		return new ResponseEntity<ChapterDetails>(chapter, HttpStatus.OK);
	}

}
