package com.logicq.school.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.logicq.school.model.QuestionDetails;

@Repository
public interface QuestionDetailsRepo extends JpaRepository<QuestionDetails, Long> {

	Page<QuestionDetails> findByClassIdAndSubjectIdAndChapterIdAndType(String classId, String subjectId, String chapterId,String type, Pageable paging );
	
	long  countByClassIdAndSubjectIdAndChapterIdAndType(String classId, String subjectId, String chapterId,String type);


}
