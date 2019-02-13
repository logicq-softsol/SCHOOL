package com.logicq.school.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.logicq.school.model.UserWorkSpace;

@Repository
public interface WorkSpaceDetailsRepo extends JpaRepository<UserWorkSpace, Long> {

	List<UserWorkSpace> findByUserId(Long userId);

	List<UserWorkSpace> findByClassIdAndSubjectIdAndUserId(Long classId, Long subjectId, Long userId);

	UserWorkSpace findByClassIdAndSubjectIdAndChapterIdAndUserId(Long classId, Long subjectId, Long chapterId,
			Long userId);
}
