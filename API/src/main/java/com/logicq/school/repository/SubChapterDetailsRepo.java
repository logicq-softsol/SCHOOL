package com.logicq.school.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.logicq.school.model.SubChapterDetails;

@Repository
public interface SubChapterDetailsRepo extends JpaRepository<SubChapterDetails, Long> {

	List<SubChapterDetails> findByClassIdAndSubjectIdAndChapterId(Long classId, Long subjectId, Long chapterId);
}
