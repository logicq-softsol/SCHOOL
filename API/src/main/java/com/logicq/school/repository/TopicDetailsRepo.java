package com.logicq.school.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.logicq.school.model.TopicDetails;

@Repository
public interface TopicDetailsRepo extends JpaRepository<TopicDetails, String> {

	List<TopicDetails> findByClassIdAndSubjectIdAndChapterId(String classId, String subjectId, String chapterId);

	TopicDetails findByClassIdAndSubjectIdAndChapterIdAndId(String classId, String subjectId, String chapterId,
			String id);

	TopicDetails findByClassIdAndSubjectIdAndChapterIdAndName(String classId, String subjectId, String chapterId,
			String name);

	List<TopicDetails> findByClassIdAndSubjectIdAndChapterIdAndContentType(String classId, String subjectId,
			String chapterId, String contentType);
}
