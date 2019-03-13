package com.logicq.school.controller;

import java.io.File;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.logicq.school.model.ChapterDetails;
import com.logicq.school.model.ClassDetails;
import com.logicq.school.model.Favorites;
import com.logicq.school.model.LoginDetails;
import com.logicq.school.model.SubjectDetails;
import com.logicq.school.model.TopicDetails;
import com.logicq.school.model.UserWorkSpace;
import com.logicq.school.repository.ChapterDetailsRepo;
import com.logicq.school.repository.ClassesDetailsRepo;
import com.logicq.school.repository.SubjectDetailsRepo;
import com.logicq.school.repository.TopicDetailsRepo;
import com.logicq.school.repository.UserFavortiesRepo;
import com.logicq.school.repository.WorkSpaceDetailsRepo;
import com.logicq.school.utils.SchoolSecurityUtils;

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

	@Autowired
	TopicDetailsRepo topicDetailsRepo;

	@Autowired
	WorkSpaceDetailsRepo workSpaceDetailsRepo;

	@Autowired
	UserFavortiesRepo userFavortiesRepo;

	@Autowired
	SchoolSecurityUtils schoolSecurityUtils;

	@RequestMapping(value = "/classes", method = RequestMethod.GET)
	public ResponseEntity<List<ClassDetails>> getClassDetails() throws Exception {
		LoginDetails loginDetail = schoolSecurityUtils.getUserFromSecurityContext();
		List<ClassDetails> classesList = classesDetailsRepo.findAll();
		if (!classesList.isEmpty()) {
			classesList.forEach(classes -> {
				Favorites fav = userFavortiesRepo.findByUserNameAndTypeAndTypeValue(loginDetail.getUserName(), "CLASS",
						classes.getId());
				if (null != fav) {
					classes.setType("FAVORTIE");
				} else {
					classes.setType("NOT_FAVORTIE");
				}
			});
		}

		return new ResponseEntity<List<ClassDetails>>(classesList, HttpStatus.OK);
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
	public ResponseEntity<List<SubjectDetails>> getSubjectDetails() throws Exception {
		LoginDetails loginDetail = schoolSecurityUtils.getUserFromSecurityContext();
		List<SubjectDetails> subjectList = subjectDetailsRepo.findAll();
		if (!subjectList.isEmpty()) {
			subjectList.forEach(subj -> {
				Favorites fav = userFavortiesRepo.findByUserNameAndTypeAndTypeValue(loginDetail.getUserName(),
						"SUBJECT", subj.getId());
				if (null != fav) {
					subj.setType("FAVORTIE");
				} else {
					subj.setType("NOT_FAVORTIE");
				}
			});
		}

		return new ResponseEntity<List<SubjectDetails>>(subjectList, HttpStatus.OK);
	}

	@RequestMapping(value = "/subjects/{classId}", method = RequestMethod.GET)
	public ResponseEntity<List<SubjectDetails>> getSubjectDetailsForClasses(@PathVariable Long classId)
			throws Exception {
		LoginDetails loginDetail = schoolSecurityUtils.getUserFromSecurityContext();
		List<SubjectDetails> subjectList = subjectDetailsRepo.findByClassId(classId);
		if (!subjectList.isEmpty()) {
			subjectList.forEach(subj -> {
				Favorites fav = userFavortiesRepo.findByUserNameAndTypeAndTypeValue(loginDetail.getUserName(),
						"SUBJECT", subj.getId());
				if (null != fav) {
					subj.setType("FAVORTIE");
				} else {
					subj.setType("NOT_FAVORTIE");
				}
			});
		}

		return new ResponseEntity<List<SubjectDetails>>(subjectList, HttpStatus.OK);
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
			@PathVariable Long subjectId) throws Exception {
		LoginDetails loginDetail = schoolSecurityUtils.getUserFromSecurityContext();
		List<ChapterDetails> chapterList = chapterDetailsRepo.findByClassIdAndSubjectId(classId, subjectId);
		if (!chapterList.isEmpty()) {
			chapterList.forEach(chapter -> {
				Favorites fav = userFavortiesRepo.findByUserNameAndTypeAndTypeValue(loginDetail.getUserName(),
						"CHAPTER", chapter.getId());
				if (null != fav) {
					chapter.setType("FAVORTIE");
				} else {
					chapter.setType("NOT_FAVORTIE");
				}
			});
		}

		return new ResponseEntity<List<ChapterDetails>>(chapterList, HttpStatus.OK);
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

	@RequestMapping(value = "/chapters/{classId}/{subjectId}/{chapterId}", method = RequestMethod.DELETE)
	public ResponseEntity<ChapterDetails> deleteChapter(@PathVariable Long classId, @PathVariable Long subjectId,
			@PathVariable Long chapterId) throws Exception {
		ChapterDetails chapter = chapterDetailsRepo.findByClassIdAndSubjectIdAndId(classId, subjectId, chapterId);
		chapterDetailsRepo.delete(chapter);
		return new ResponseEntity<ChapterDetails>(chapter, HttpStatus.OK);
	}

	@RequestMapping(value = "/topic/{classId}/{subjectId}/{chapterId}", method = RequestMethod.GET)
	public ResponseEntity<List<TopicDetails>> getTopicForChapterDetailsForClassAndSubject(@PathVariable Long classId,
			@PathVariable Long subjectId, @PathVariable Long chapterId) throws Exception {
		LoginDetails loginDetail = schoolSecurityUtils.getUserFromSecurityContext();
		List<TopicDetails> topicList = topicDetailsRepo.findByClassIdAndSubjectIdAndChapterId(classId, subjectId,
				chapterId);
		if (!topicList.isEmpty()) {
			topicList.forEach(topic -> {
				Favorites fav = userFavortiesRepo.findByUserNameAndTypeAndTypeValue(loginDetail.getUserName(), "TOPIC",
						topic.getId());
				if (null != fav) {
					topic.setType("FAVORTIE");
				} else {
					topic.setType("NOT_FAVORTIE");
				}
			});
		}
		return new ResponseEntity<List<TopicDetails>>(topicList, HttpStatus.OK);
	}

	@RequestMapping(value = "/topic/{classId}/{subjectId}/{chapterId}/{topicId}", method = RequestMethod.GET)
	public ResponseEntity<TopicDetails> getChapterDetailsForClassAndSubjectAndTopic(@PathVariable Long classId,
			@PathVariable Long subjectId, @PathVariable Long chapterId, @PathVariable Long topicId) {
		return new ResponseEntity<TopicDetails>(
				topicDetailsRepo.findByClassIdAndSubjectIdAndChapterIdAndId(classId, subjectId, chapterId, topicId),
				HttpStatus.OK);
	}

	@RequestMapping(value = "/topic", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<TopicDetails> addTopic(@RequestBody TopicDetails topicDetail) throws Exception {
		topicDetailsRepo.save(topicDetail);
		return new ResponseEntity<TopicDetails>(topicDetail, HttpStatus.OK);
	}

	@RequestMapping(value = "/topic", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<TopicDetails> updateTopicDetail(@RequestBody TopicDetails topicDetail) throws Exception {
		topicDetailsRepo.save(topicDetail);
		return new ResponseEntity<TopicDetails>(topicDetail, HttpStatus.OK);
	}

	@RequestMapping(value = "/topic/{classId}/{subjectId}/{chapterId}/{topicId}", method = RequestMethod.DELETE)
	public ResponseEntity<TopicDetails> deleteTopic(@PathVariable Long classId, @PathVariable Long subjectId,
			@PathVariable Long chapterId, @PathVariable Long topicId) throws Exception {
		TopicDetails topic = topicDetailsRepo.findByClassIdAndSubjectIdAndChapterIdAndId(classId, subjectId, chapterId,
				topicId);
		topicDetailsRepo.delete(topic);
		return new ResponseEntity<TopicDetails>(topic, HttpStatus.OK);
	}

	@RequestMapping(value = "/workspace/{classId}/{subjectId}/{chapterId}/{topicId}", method = RequestMethod.GET)
	public ResponseEntity<List<UserWorkSpace>> getUserWorkSpace(@PathVariable Long classId,
			@PathVariable Long subjectId, @PathVariable Long chapterId, @PathVariable Long topicId) throws Exception {
		LoginDetails loginDetail = schoolSecurityUtils.getUserFromSecurityContext();
		List<UserWorkSpace> workspaceList = workSpaceDetailsRepo
				.findByClassIdAndSubjectIdAndChapterIdAndUserNameAndTopicId(classId, subjectId, chapterId,
						loginDetail.getUserName(), topicId);
		return new ResponseEntity<List<UserWorkSpace>>(workspaceList, HttpStatus.OK);
	}

	@RequestMapping(value = "/workspace/{classId}/{subjectId}/{chapterId}", method = RequestMethod.GET)
	public ResponseEntity<List<UserWorkSpace>> getUserWorkSpaceForChapters(@PathVariable Long classId,
			@PathVariable Long subjectId, @PathVariable Long chapterId) throws Exception {
		LoginDetails loginDetail = schoolSecurityUtils.getUserFromSecurityContext();
		List<UserWorkSpace> workspaceList = workSpaceDetailsRepo.findByClassIdAndSubjectIdAndChapterIdAndUserName(
				classId, subjectId, chapterId, loginDetail.getUserName());

		return new ResponseEntity<List<UserWorkSpace>>(workspaceList, HttpStatus.OK);
	}

	@RequestMapping(value = "/workspace", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserWorkSpace> createWorkSpace(@RequestBody UserWorkSpace workSpace) throws Exception {
		LoginDetails loginDetail = schoolSecurityUtils.getUserFromSecurityContext();
		workSpace.setUserName(loginDetail.getUserName());
		workSpaceDetailsRepo.save(workSpace);
		return new ResponseEntity<UserWorkSpace>(workSpace, HttpStatus.OK);
	}

	@RequestMapping(value = "/workspace", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<UserWorkSpace> updateTopicDetail(@RequestBody UserWorkSpace workSpace) throws Exception {
		LoginDetails loginDetail = schoolSecurityUtils.getUserFromSecurityContext();
		workSpace.setUserName(loginDetail.getUserName());
		workSpaceDetailsRepo.save(workSpace);
		return new ResponseEntity<UserWorkSpace>(workSpace, HttpStatus.OK);
	}

	@RequestMapping(value = "/favorties", method = RequestMethod.GET)
	public ResponseEntity<List<Favorites>> getFavorties() throws Exception {
		LoginDetails loginDetail = schoolSecurityUtils.getUserFromSecurityContext();
		return new ResponseEntity<List<Favorites>>(userFavortiesRepo.findByUserName(loginDetail.getUserName()),
				HttpStatus.OK);
	}

	@RequestMapping(value = "/favortie", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Favorites> markFavorites(@RequestBody Favorites favorites) throws Exception {
		LoginDetails loginDetail = schoolSecurityUtils.getUserFromSecurityContext();
		favorites.setUserName(loginDetail.getUserName());
		userFavortiesRepo.save(favorites);
		return new ResponseEntity<Favorites>(favorites, HttpStatus.OK);
	}

	@RequestMapping(value = "/favortie/{type}/{typeId}", method = RequestMethod.DELETE)
	public ResponseEntity<Favorites> removeFavorites(@PathVariable String type, @PathVariable Long typeId)
			throws Exception {
		LoginDetails loginDetail = schoolSecurityUtils.getUserFromSecurityContext();
		Favorites fav = userFavortiesRepo.findByUserNameAndTypeAndTypeValue(loginDetail.getUserName(), type, typeId);
		userFavortiesRepo.delete(fav);
		return new ResponseEntity<Favorites>(fav, HttpStatus.OK);
	}

	@GetMapping("/readvideofile")
	public void readVideoFile(HttpServletResponse response) throws Exception {
		LoginDetails loginDetail = schoolSecurityUtils.getUserFromSecurityContext();
		if (null != loginDetail) {
			String decryptedkey = schoolSecurityUtils.decryptText(schoolSecurityUtils.readFileLine("license.key"),
					schoolSecurityUtils.getPublic("KeyPair/publicKey"));
			schoolSecurityUtils.decryptVideoFile(decryptedkey,
					new File("E:\\WORK_SPACE\\SCHOOL_CONTENT\\video\\video_encrypted\\1.First Aid for wounds.lq"),
					response);

		}

	}

}
