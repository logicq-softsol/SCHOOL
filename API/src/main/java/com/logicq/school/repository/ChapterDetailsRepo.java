package com.logicq.school.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.logicq.school.model.ChapterDetails;

@Repository
public interface ChapterDetailsRepo extends JpaRepository<ChapterDetails, String> {

	List<ChapterDetails> findByClassId(String classId);

	List<ChapterDetails> findByClassIdAndSubjectId(String classId, String subjectId);

	ChapterDetails findByClassIdAndSubjectIdAndId(String classId, String subjectId, String chapterId);
	
	ChapterDetails findByClassIdAndSubjectIdAndName(String classId, String subjectId, String name);
}
