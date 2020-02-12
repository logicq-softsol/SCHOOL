package com.logicq.school.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.logicq.school.model.ChapterDetails;
import com.logicq.school.model.QuestionDetails;

@Repository
public interface QuestionDetailsRepo extends JpaRepository<QuestionDetails, String> {

	List<QuestionDetails> findByClassIdAndSubjectIdAndChapterId(String classId, String subjectId, String chapterId);

}
