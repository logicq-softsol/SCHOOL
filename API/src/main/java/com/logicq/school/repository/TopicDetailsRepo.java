package com.logicq.school.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.logicq.school.model.TopicDetails;

@Repository
public interface TopicDetailsRepo extends JpaRepository<TopicDetails, Long> {

	List<TopicDetails> findByClassIdAndSubjectIdAndChapterId(Long classId, Long subjectId, Long chapterId);

	TopicDetails findByClassIdAndSubjectIdAndChapterIdAndId(Long classId, Long subjectId, Long chapterId, Long id);

	TopicDetails findByClassIdAndSubjectIdAndChapterIdAndName(Long classId, Long subjectId, Long chapterId,
			String name);
}
