package com.logicq.school.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.logicq.school.model.ChapterDetails;

@Repository
public interface ChapterDetailsRepo extends JpaRepository<ChapterDetails, Long> {

	List<ChapterDetails> findByClassId(Long classId);

	List<ChapterDetails> findByClassIdAndSubjectId(Long classId, Long subjectId);

	ChapterDetails findByClassIdAndSubjectIdAndId(Long classId, Long subjectId, Long chapterId);
	
	ChapterDetails findByClassIdAndSubjectIdAndName(Long classId, Long subjectId, String name);
}
