package com.logicq.school.utils;

import org.springframework.stereotype.Component;

import com.logicq.school.model.ChapterDetails;
import com.logicq.school.model.ClassDetails;
import com.logicq.school.model.ContentDetail;
import com.logicq.school.model.SchoolDetail;
import com.logicq.school.model.SubjectDetails;
import com.logicq.school.model.TopicDetails;
import com.logicq.school.vo.ChapterVO;
import com.logicq.school.vo.ClassVO;
import com.logicq.school.vo.ContentDetailsVO;
import com.logicq.school.vo.SchoolVO;
import com.logicq.school.vo.SubjectVO;
import com.logicq.school.vo.TopicVO;

@Component
public class SchoolHelperUtils {

	public SchoolDetail prepareSchoolEntity(SchoolVO school) {
		SchoolDetail schoolDetail = new SchoolDetail();
		schoolDetail.setBoardtype(school.getBoardtype());
		schoolDetail.setId(school.getId());
		schoolDetail.setImgURL(school.getImgURL());
		schoolDetail.setName(school.getNamme());
		schoolDetail.setDisplayName(school.getDisplayName());
		schoolDetail.setDescription(school.getDescription());
		return schoolDetail;
	}

	public ClassDetails prepareClassEntity(ClassVO classVO) {
		ClassDetails classDetail = new ClassDetails();
		classDetail.setId(classVO.getId());
		classDetail.setDisplayName(classVO.getDisplayName());
		classDetail.setName(classVO.getName());
		classDetail.setDescription(classVO.getDescription());
		classDetail.setImgURL(classVO.getImgURL());
		return classDetail;
	}

	public SubjectDetails prepareSubjectEntity(SubjectVO subjectVO, String classId) {
		SubjectDetails subjectDetails = new SubjectDetails();
		subjectDetails.setId(subjectVO.getId());
		subjectDetails.setDisplayName(subjectVO.getDisplayName());
		subjectDetails.setName(subjectVO.getName());
		subjectDetails.setDescription(subjectVO.getDescription());
		subjectDetails.setImgURL(subjectVO.getImgURL());
		subjectDetails.setClassId(classId);
		return subjectDetails;
	}

	public ChapterDetails prepareChapterEntity(ChapterVO chapterVO, SubjectDetails subject) {
		ChapterDetails chapter = new ChapterDetails();
		chapter.setId(chapterVO.getId());
		chapter.setDisplayName(chapterVO.getDisplayName());
		chapter.setName(chapterVO.getName());
		chapter.setDescription(chapterVO.getDescription());
		chapter.setImgURL(chapterVO.getImgURL());
		chapter.setSubjectId(subject.getId());
		chapter.setClassId(subject.getClassId());
		return chapter;

	}

	public TopicDetails prepareTopicEntity(TopicVO topicVO, ChapterDetails chapter) {
		TopicDetails topic = new TopicDetails();
		topic.setId(topicVO.getId());
		topic.setDisplayName(topicVO.getDisplayName());
		topic.setName(topicVO.getName());
		topic.setDescription(topicVO.getDescription());
		topic.setImgURL(topicVO.getImgURL());
		topic.setSubjectId(chapter.getSubjectId());
		topic.setChapterId(chapter.getId());
		topic.setClassId(chapter.getClassId());
		return topic;
	}

	public ContentDetail prepareContenetDetailsEntity(ContentDetailsVO contentVO, String type, String category,
			String classId, String subjectId, String chapterId, String topicId) {
		ContentDetail content = new ContentDetail();
		content.setCategory(category);
		content.setType(type);
		content.setId(contentVO.getId());
		content.setClassId(classId);
		if ("CHAPTER".equals(type)) {
			content.setChapterId(chapterId);
		}
		if ("SUBJECT".equals(type)) {
			content.setSubjectId(subjectId);
			content.setChapterId(chapterId);
		}
		if ("TOPIC".equals(type)) {
			content.setSubjectId(subjectId);
			content.setChapterId(chapterId);
			content.setTopicId(topicId);
		}
		return content;
	}

}
