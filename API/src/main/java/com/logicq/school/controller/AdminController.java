package com.logicq.school.controller;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.core.env.Environment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.logicq.school.exception.SucessMessage;
import com.logicq.school.model.ActivationDetails;
import com.logicq.school.model.ChapterDetails;
import com.logicq.school.model.ClassDetails;
import com.logicq.school.model.Favorites;
import com.logicq.school.model.LoginDetails;
import com.logicq.school.model.QuestionDetails;
import com.logicq.school.model.SubjectDetails;
import com.logicq.school.model.TopicDetails;
import com.logicq.school.model.UserWorkSpace;
import com.logicq.school.repository.ChapterDetailsRepo;
import com.logicq.school.repository.ClassesDetailsRepo;
import com.logicq.school.repository.ProductActivationRepo;
import com.logicq.school.repository.QuestionDetailsRepo;
import com.logicq.school.repository.SchoolDetailsRepo;
import com.logicq.school.repository.SubjectDetailsRepo;
import com.logicq.school.repository.TopicDetailsRepo;
import com.logicq.school.repository.UserFavortiesRepo;
import com.logicq.school.repository.WorkSpaceDetailsRepo;
import com.logicq.school.utils.LogicQEncryptionAndDecryption;
import com.logicq.school.utils.SchoolDateUtils;
import com.logicq.school.utils.SchoolSecurityUtils;
import com.logicq.school.vo.FavoritesVO;
import com.logicq.school.vo.SchoolVO;

@RestController
@EnableAutoConfiguration
@RequestMapping("/api/admin")
public class AdminController {

	private static final Logger logger = LoggerFactory.getLogger(AdminController.class);

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

	@Autowired
	ProductActivationRepo productActivationRepo;

	@Autowired
	Environment env;

	@Autowired
	LogicQEncryptionAndDecryption logicQEncryptionAndDecryption;

	@Autowired
	SchoolDetailsRepo schoolDetailsRepo;

	@Autowired
	QuestionDetailsRepo questionDetailsRepo;

	@Autowired
	SchoolDateUtils schoolDateUtils;

	@RequestMapping(value = "/schoo", method = RequestMethod.GET)
	public ResponseEntity<SchoolVO> getSchoolDetails() throws Exception {
		SchoolVO schoolVO = new SchoolVO();
		schoolDetailsRepo.findAll();
		return new ResponseEntity<SchoolVO>(schoolVO, HttpStatus.OK);
	}

	@RequestMapping(value = "/questions/count/{classId}/{subjectId}/{chapterId}/{type}", method = RequestMethod.GET)
	public ResponseEntity<SucessMessage> recordCount(@PathVariable String classId, @PathVariable String subjectId,
			@PathVariable String chapterId, @PathVariable String type) {
		long recordCount = questionDetailsRepo.countByClassIdAndSubjectIdAndChapterIdAndType(classId, subjectId,
				chapterId, type);
		return new ResponseEntity<SucessMessage>(
				new SucessMessage(new Date(), "Question Record Count", String.valueOf(recordCount)), HttpStatus.OK);
	}

	@RequestMapping(value = "/questions/{classId}/{subjectId}/{chapterId}/{type}", method = RequestMethod.GET)
	public ResponseEntity<List<QuestionDetails>> getQuestionsChapterDetailsForClassAndSubjectAndContentType(
			@PathVariable String classId, @PathVariable String subjectId, @PathVariable String chapterId,
			@PathVariable String type, @RequestParam Integer pageNo, @RequestParam Integer pageSize) {
		Pageable pageable = new PageRequest(pageNo, pageSize);
		Page<QuestionDetails> questionList = questionDetailsRepo.findByClassIdAndSubjectIdAndChapterIdAndType(classId,
				subjectId, chapterId, type, pageable);
		if (questionList.hasContent()) {
			return new ResponseEntity<List<QuestionDetails>>(questionList.getContent(), HttpStatus.OK);
		}
		return new ResponseEntity<List<QuestionDetails>>(new ArrayList<>(), HttpStatus.OK);
	}

	@RequestMapping(value = "/day0/questionsetup", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<QuestionDetails>> setupDayZeroForQuestion() throws Exception {
		List<QuestionDetails> questionList = new ArrayList<>();
		File file = ResourceUtils.getFile("classpath:question.txt");
		Files.lines(Paths.get(file.getAbsolutePath())).skip(1).forEach(lin -> {
			String[] wordList = lin.split("#");
			ClassDetails classDetails = classesDetailsRepo.findByName(wordList[1].toLowerCase().trim());
			SubjectDetails subejctDetail = subjectDetailsRepo.findByClassIdAndName(classDetails.getId(),
					wordList[2].toLowerCase().trim());
			ChapterDetails chapter = chapterDetailsRepo.findByClassIdAndSubjectIdAndName(classDetails.getId(),
					subejctDetail.getId(), wordList[3].toLowerCase().trim());
			if ("MCQ".equalsIgnoreCase(wordList[0].trim())) {
				QuestionDetails question = new QuestionDetails();
				question.setClassId(chapter.getClassId());
				question.setSubjectId(chapter.getSubjectId());
				question.setChapterId(chapter.getId());
				question.setOption1(wordList[5]);
				question.setOption2(wordList[6]);
				question.setOption3(wordList[7]);
				question.setOption4(wordList[8]);
				question.setQuestion(wordList[4]);
				question.setApplicableFor("CHAPTER");
				if ("OPTION1".equalsIgnoreCase(wordList[9])) {
					question.setCorrectAns(question.getOption1());
				}
				if ("OPTION2".equalsIgnoreCase(wordList[9])) {
					question.setCorrectAns(question.getOption2());
				}
				if ("OPTION3".equalsIgnoreCase(wordList[9])) {
					question.setCorrectAns(question.getOption3());
				}
				if ("OPTION4".equalsIgnoreCase(wordList[9])) {
					question.setCorrectAns(question.getOption4());
				}
				question.setType(wordList[0].toUpperCase());
				questionList.add(question);
			}
			if ("SAMPLE".equalsIgnoreCase(wordList[0].trim()) || "BEXAM".equalsIgnoreCase(wordList[0].trim())) {
				QuestionDetails question = new QuestionDetails();
				question.setClassId(chapter.getClassId());
				question.setSubjectId(chapter.getSubjectId());
				question.setChapterId(chapter.getId());
				question.setQuestion(wordList[4]);
				question.setOption1(wordList[5]);
				question.setType(wordList[0].toUpperCase());
				questionList.add(question);
			}
		});
		// Delete all Question
		questionDetailsRepo.deleteAll();
		if (!questionList.isEmpty()) {
			questionDetailsRepo.save(questionList);
		}

		return new ResponseEntity<List<QuestionDetails>>(questionList, HttpStatus.OK);
	}

	@RequestMapping(value = "/day0/setup", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<TopicDetails>> setupDayZeroForSchool() throws Exception {
		List<TopicDetails> allTopicDetail = new ArrayList<>();
		File file = ResourceUtils.getFile("classpath:topic.txt");
		List<String> classList = new ArrayList<>();
		Set<String> subjectList = new HashSet<>();
		Set<String> chapterList = new HashSet<>();
		Set<String> topicList = new HashSet<>();

		Files.lines(Paths.get(file.getAbsolutePath())).skip(1).forEach(lin -> {
			String[] wordList = lin.split("#");
			classList.add(wordList[0]);
			subjectList.add(wordList[0] + "#" + wordList[1]);
			chapterList.add(wordList[0] + "#" + wordList[1] + "#" + wordList[2] + "#" + wordList[6] + "#" + wordList[7]
					+ "#" + wordList[8] + "#" + wordList[9] + "#" + wordList[10] + "#" + wordList[11]);
			topicList.add(wordList[0] + "#" + wordList[1] + "#" + wordList[2] + "#" + wordList[3] + "#" + wordList[4]
					+ "#" + wordList[12]);
		});
		topicDetailsRepo.deleteAll();
		chapterDetailsRepo.deleteAll();
		subjectDetailsRepo.deleteAll();
		classesDetailsRepo.deleteAll();

		if (!classList.isEmpty()) {
			List<ClassDetails> allClass = new ArrayList<>();
			classList.stream().distinct().forEach(lin -> {
				ClassDetails classresult = new ClassDetails();
				classresult.setDisplayName(lin);
				classresult.setName(classresult.getDisplayName().toLowerCase().trim());
				classresult.setDescription("About class " + classresult.getDisplayName());
				classresult.setType("CLASS");
				classresult.setId(RandomStringUtils.randomAlphanumeric(2));
				allClass.add(classresult);
			});
			if (!allClass.isEmpty())
				classesDetailsRepo.save(allClass);

			if (!subjectList.isEmpty()) {
				Set<SubjectDetails> allSubject = new HashSet<>();
				subjectList.forEach(sub -> {
					String[] wordList = sub.split("#");
					if (wordList.length > 1) {
						ClassDetails classDetails = classesDetailsRepo.findByName(wordList[0].toLowerCase().trim());
						SubjectDetails subejctDetail = new SubjectDetails();
						subejctDetail.setClassId(classDetails.getId());
						subejctDetail.setName(wordList[1].toLowerCase().trim());
						subejctDetail.setDisplayName(wordList[1]);
						subejctDetail.setDescription("About Subject" + subejctDetail.getDisplayName() + " for "
								+ classDetails.getDisplayName());
						subejctDetail.setType("SUBJECT");
						subejctDetail.setId(RandomStringUtils.randomAlphanumeric(3));
						allSubject.add(subejctDetail);
					}
				});

				if (!allSubject.isEmpty())
					subjectDetailsRepo.save(allSubject);

				if (!chapterList.isEmpty()) {
					Set<ChapterDetails> allChapter = new HashSet<>();
					chapterList.forEach(chp -> {
						String[] wordList = chp.split("#");
						if (wordList.length > 2) {
							ClassDetails classDetails = classesDetailsRepo.findByName(wordList[0].toLowerCase().trim());
							SubjectDetails subejctDetail = subjectDetailsRepo.findByClassIdAndName(classDetails.getId(),
									wordList[1].toLowerCase().trim());
							ChapterDetails chapterDetails = new ChapterDetails();
							chapterDetails.setClassId(subejctDetail.getClassId());
							chapterDetails.setName(wordList[2].toLowerCase().trim());
							chapterDetails.setDisplayName(wordList[2]);
							chapterDetails.setDescription("This Chapter decribes more about " + wordList[2]
									+ " And belongs to Subject " + subejctDetail.getDisplayName() + " for class "
									+ classDetails.getDisplayName());
							chapterDetails.setSubjectId(subejctDetail.getId());
							chapterDetails.setType("CHAPTER");
							chapterDetails.setId(RandomStringUtils.randomAlphanumeric(4));
							if (1 == Integer.valueOf(wordList[3])) {
								chapterDetails.setIsVideo(Boolean.TRUE);
							} else {
								chapterDetails.setIsVideo(Boolean.FALSE);
							}

							if (1 == Integer.valueOf(wordList[4])) {
								chapterDetails.setIsPPt(Boolean.TRUE);
							} else {
								chapterDetails.setIsPPt(Boolean.FALSE);
							}

							if (1 == Integer.valueOf(wordList[5])) {
								chapterDetails.setIsPDF(Boolean.TRUE);
							} else {
								chapterDetails.setIsPDF(Boolean.FALSE);
							}

							if (1 == Integer.valueOf(wordList[6])) {
								chapterDetails.setIsMCQ(Boolean.TRUE);
							} else {
								chapterDetails.setIsMCQ(Boolean.FALSE);
							}

							if (1 == Integer.valueOf(wordList[7])) {
								chapterDetails.setIsSampleQuest(Boolean.TRUE);
							} else {
								chapterDetails.setIsSampleQuest(Boolean.FALSE);
							}

							if (1 == Integer.valueOf(wordList[8])) {
								chapterDetails.setIsExamQuest(Boolean.TRUE);
							} else {
								chapterDetails.setIsExamQuest(Boolean.FALSE);
							}

							allChapter.add(chapterDetails);
						}

					});
					if (!allChapter.isEmpty())
						chapterDetailsRepo.save(allChapter);
				}

			}

		}

		if (!topicList.isEmpty()) {
			topicList.forEach(top -> {
				String[] wordList = top.split("#");
				if (wordList.length > 3) {
					ClassDetails classDetails = classesDetailsRepo.findByName(wordList[0].toLowerCase().trim());
					SubjectDetails subejctDetail = subjectDetailsRepo.findByClassIdAndName(classDetails.getId(),
							wordList[1].toLowerCase().trim());
					ChapterDetails chapter = chapterDetailsRepo.findByClassIdAndSubjectIdAndName(classDetails.getId(),
							subejctDetail.getId(), wordList[2].toLowerCase().trim());
					TopicDetails topicDetails = new TopicDetails();
					topicDetails.setClassId(classDetails.getId());
					topicDetails.setName(wordList[3].toLowerCase().trim());
					topicDetails.setDisplayName(wordList[3]);
					topicDetails.setDescription("About Topic for chapter" + chapter.getDisplayName() + " for Subject "
							+ subejctDetail.getDisplayName() + " of class " + classDetails.getDisplayName());
					topicDetails.setSubjectId(subejctDetail.getId());
					topicDetails.setChapterId(chapter.getId());
					topicDetails.setId(RandomStringUtils.randomAlphanumeric(5));
					topicDetails.setType("TOPIC");
					topicDetails.setContentType(wordList[5].trim());
					topicDetails.setContentURL(wordList[4].trim());
					allTopicDetail.add(topicDetails);
				}

			});
			if (!allTopicDetail.isEmpty()) {
				topicDetailsRepo.save(allTopicDetail);
			}

		}

		return new ResponseEntity<List<TopicDetails>>(allTopicDetail, HttpStatus.OK);
	}

	@RequestMapping(value = "/classes", method = RequestMethod.GET)
	public ResponseEntity<List<ClassDetails>> getClassDetails() throws Exception {
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
	public ResponseEntity<ClassDetails> deleteClassDetails(@PathVariable String classId) throws Exception {
		classesDetailsRepo.delete(classId);
		return new ResponseEntity<ClassDetails>(new ClassDetails(), HttpStatus.OK);
	}

	@RequestMapping(value = "/classes/{classId}", method = RequestMethod.GET)
	public ResponseEntity<ClassDetails> getClassDetail(@PathVariable String classId) throws Exception {
		LoginDetails loginDetail = schoolSecurityUtils.getUserFromSecurityContext();
		ClassDetails classDetail = classesDetailsRepo.findOne(classId);
		return new ResponseEntity<ClassDetails>(classDetail, HttpStatus.OK);
	}

	@RequestMapping(value = "/subjects", method = RequestMethod.GET)
	public ResponseEntity<List<SubjectDetails>> getSubjectDetails() throws Exception {
		return new ResponseEntity<List<SubjectDetails>>(subjectDetailsRepo.findAll(), HttpStatus.OK);
	}

	@RequestMapping(value = "/subjects/{classId}", method = RequestMethod.GET)
	public ResponseEntity<List<SubjectDetails>> getSubjectDetailsForClasses(@PathVariable String classId)
			throws Exception {
		return new ResponseEntity<List<SubjectDetails>>(subjectDetailsRepo.findByClassId(classId), HttpStatus.OK);
	}

	@RequestMapping(value = "/subjects/{classId}/{subjectId}", method = RequestMethod.GET)
	public ResponseEntity<SubjectDetails> getSubjectDetailForClasses(@PathVariable String classId,
			@PathVariable String subjectId) throws Exception {
		return new ResponseEntity<SubjectDetails>(subjectDetailsRepo.findByClassIdAndId(classId, subjectId),
				HttpStatus.OK);
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
	public ResponseEntity<SubjectDetails> deleteSubjectDetails(@PathVariable String classId,
			@PathVariable String subjectId) throws Exception {
		subjectDetailsRepo.delete(subjectId);
		return new ResponseEntity<SubjectDetails>(new SubjectDetails(), HttpStatus.OK);
	}

	@RequestMapping(value = "/chapters", method = RequestMethod.GET)
	public ResponseEntity<List<ChapterDetails>> getChapterDetails() {
		return new ResponseEntity<List<ChapterDetails>>(chapterDetailsRepo.findAll(), HttpStatus.OK);
	}

	@RequestMapping(value = "/chapters/{classId}/{subjectId}", method = RequestMethod.GET)
	public ResponseEntity<List<ChapterDetails>> getChapterDetailsForClassAndSubject(@PathVariable String classId,
			@PathVariable String subjectId) throws Exception {
		return new ResponseEntity<List<ChapterDetails>>(
				chapterDetailsRepo.findByClassIdAndSubjectId(classId, subjectId), HttpStatus.OK);
	}

	@RequestMapping(value = "/chapters/{classId}/{subjectId}/{chapterId}", method = RequestMethod.GET)
	public ResponseEntity<ChapterDetails> getChapterDetailsForClassAndSubject(@PathVariable String classId,
			@PathVariable String subjectId, @PathVariable String chapterId) {
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
	public ResponseEntity<ChapterDetails> deleteChapter(@PathVariable String classId, @PathVariable String subjectId,
			@PathVariable String chapterId) throws Exception {
		ChapterDetails chapter = chapterDetailsRepo.findByClassIdAndSubjectIdAndId(classId, subjectId, chapterId);
		chapterDetailsRepo.delete(chapter);
		return new ResponseEntity<ChapterDetails>(chapter, HttpStatus.OK);
	}

	@RequestMapping(value = "/topic/{classId}/{subjectId}/{chapterId}", method = RequestMethod.GET)
	public ResponseEntity<List<TopicDetails>> getTopicForChapterDetailsForClassAndSubject(@PathVariable String classId,
			@PathVariable String subjectId, @PathVariable String chapterId) throws Exception {
		List<TopicDetails> topicList = topicDetailsRepo.findByClassIdAndSubjectIdAndChapterId(classId, subjectId,
				chapterId);
		return new ResponseEntity<List<TopicDetails>>(topicList, HttpStatus.OK);
	}

	@RequestMapping(value = "/topic/{classId}/{subjectId}/{chapterId}/{topicId}", method = RequestMethod.GET)
	public ResponseEntity<TopicDetails> getChapterDetailsForClassAndSubjectAndTopic(@PathVariable String classId,
			@PathVariable String subjectId, @PathVariable String chapterId, @PathVariable String topicId) {
		return new ResponseEntity<TopicDetails>(
				topicDetailsRepo.findByClassIdAndSubjectIdAndChapterIdAndId(classId, subjectId, chapterId, topicId),
				HttpStatus.OK);
	}

	@RequestMapping(value = "/topics/{classId}/{subjectId}/{chapterId}/{contentType}", method = RequestMethod.GET)
	public ResponseEntity<List<TopicDetails>> getChapterDetailsForClassAndSubjectAndContentType(
			@PathVariable String classId, @PathVariable String subjectId, @PathVariable String chapterId,
			@PathVariable String contentType) {
		return new ResponseEntity<List<TopicDetails>>(topicDetailsRepo
				.findByClassIdAndSubjectIdAndChapterIdAndContentType(classId, subjectId, chapterId, contentType),
				HttpStatus.OK);
	}

	@RequestMapping(value = "/topics", method = RequestMethod.GET)
	public ResponseEntity<List<TopicDetails>> getAllTopics() {
		return new ResponseEntity<List<TopicDetails>>(topicDetailsRepo.findAll(), HttpStatus.OK);
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
	public ResponseEntity<TopicDetails> deleteTopic(@PathVariable String classId, @PathVariable String subjectId,
			@PathVariable String chapterId, @PathVariable String topicId) throws Exception {
		TopicDetails topic = topicDetailsRepo.findByClassIdAndSubjectIdAndChapterIdAndId(classId, subjectId, chapterId,
				topicId);
		topicDetailsRepo.delete(topic);
		return new ResponseEntity<TopicDetails>(topic, HttpStatus.OK);
	}

	@RequestMapping(value = "/workspace/{classId}/{subjectId}/{chapterId}/{topicId}", method = RequestMethod.GET)
	public ResponseEntity<List<UserWorkSpace>> getUserWorkSpace(@PathVariable String classId,
			@PathVariable String subjectId, @PathVariable String chapterId, @PathVariable String topicId)
			throws Exception {
		LoginDetails loginDetail = schoolSecurityUtils.getUserFromSecurityContext();
		List<UserWorkSpace> workspaceList = workSpaceDetailsRepo
				.findByClassIdAndSubjectIdAndChapterIdAndUserNameAndTopicId(classId, subjectId, chapterId,
						loginDetail.getUserName(), topicId);
		return new ResponseEntity<List<UserWorkSpace>>(workspaceList, HttpStatus.OK);
	}

	@RequestMapping(value = "/workspace/{classId}/{subjectId}/{chapterId}", method = RequestMethod.GET)
	public ResponseEntity<List<UserWorkSpace>> getUserWorkSpaceForChapters(@PathVariable String classId,
			@PathVariable String subjectId, @PathVariable String chapterId) throws Exception {
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
	public ResponseEntity<List<FavoritesVO>> getFavorties() throws Exception {
		LoginDetails loginDetail = schoolSecurityUtils.getUserFromSecurityContext();
		List<FavoritesVO> favoriteVOs = new ArrayList<>();
		List<Favorites> favorites = userFavortiesRepo.findByUserName(loginDetail.getUserName());
		if (null != favorites && !favorites.isEmpty()) {
			favorites.forEach(fav -> {
				FavoritesVO favVO = new FavoritesVO();
				favVO.setClassId(fav.getClassId());
				favVO.setSubjectId(fav.getSubjectId());
				favVO.setChapterId(fav.getChapterId());
				favVO.setTopicId(fav.getTopicId());
				favVO.setId(fav.getId());
				favVO.setTypeValue(fav.getTypeValue());
				if ("TOPIC".equalsIgnoreCase(fav.getTypeValue())) {
					TopicDetails topic = topicDetailsRepo.findByClassIdAndSubjectIdAndChapterIdAndId(fav.getClassId(),
							fav.getSubjectId(), fav.getChapterId(), fav.getTopicId());
					favVO.setTopicDetails(topic);
				}
				favoriteVOs.add(favVO);
			});
		}
		return new ResponseEntity<List<FavoritesVO>>(favoriteVOs, HttpStatus.OK);
	}

	@RequestMapping(value = "/favortie", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Favorites> markFavorites(@RequestBody Favorites favorites) throws Exception {
		LoginDetails loginDetail = schoolSecurityUtils.getUserFromSecurityContext();
		favorites.setUserName(loginDetail.getUserName());
		Favorites fav = userFavortiesRepo.findByUserNameAndClassIdAndSubjectIdAndChapterIdAndTopicId(
				loginDetail.getUserName(), favorites.getClassId(), favorites.getSubjectId(), favorites.getChapterId(),
				favorites.getTopicId());
		if (null == fav) {
			userFavortiesRepo.save(favorites);
		}

		return new ResponseEntity<Favorites>(favorites, HttpStatus.OK);
	}

	@RequestMapping(value = "/favortie/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<SucessMessage> removeFavorites(@PathVariable Long id) throws Exception {
		userFavortiesRepo.delete(id);
		return new ResponseEntity<SucessMessage>(
				new SucessMessage(schoolDateUtils.currentDate(), "From your favorite remove successfully", "SUCESS"),
				HttpStatus.OK);
	}

	@GetMapping("/playlesson/{topicId}")
	public void playLessonForTopic(@PathVariable String topicId, HttpServletResponse response) throws Exception {
		TopicDetails topic = topicDetailsRepo.findOne(topicId);
		if (null != topic) {
			String hostName = schoolSecurityUtils.getTokenHostName();
			ActivationDetails activationDetails = productActivationRepo.findByActivationFor(hostName);
			byte[] readData = logicQEncryptionAndDecryption.readFileAndDecryptFile(new File(topic.getContentURL()),
					activationDetails.getActivationToken());
			if (readData.length > 0) {
				response.getOutputStream().write(readData);
				if ("VIDEO" == topic.getContentType()) {
					response.setContentType("video/mp4");
					response.setHeader("Content-Disposition", "attachment; filename=\"xyz.mp4\"");
				}
				if ("PPT".equalsIgnoreCase(topic.getContentType()) || "PDF".equalsIgnoreCase(topic.getContentType())) {
					response.setContentType("application/pdf");
					response.setHeader("Content-Disposition", "attachment; filename=\"xyz.pdf\"");
				}

				response.getOutputStream().flush();
			}

		}
	}

	@GetMapping("/readQuestion/{questionId}")
	public void readQuestionForChapter(@PathVariable Long questionId, HttpServletResponse response) throws Exception {
		QuestionDetails question = questionDetailsRepo.findOne(questionId);
		if (null != question) {
			String hostName = schoolSecurityUtils.getTokenHostName();
			ActivationDetails activationDetails = productActivationRepo.findByActivationFor(hostName);
			byte[] readData = logicQEncryptionAndDecryption.readFileAndDecryptFile(new File(question.getQuestion()),
					activationDetails.getActivationToken());
			if (readData.length > 0) {
				response.getOutputStream().write(readData);
				response.setContentType("application/pdf");
				response.setHeader("Content-Disposition", "attachment; filename=\"xyz.pdf\"");
				response.getOutputStream().flush();
			}

		}
	}

}
