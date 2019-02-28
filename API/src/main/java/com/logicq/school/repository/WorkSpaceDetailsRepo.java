package com.logicq.school.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.logicq.school.model.UserWorkSpace;

@Repository
public interface WorkSpaceDetailsRepo extends JpaRepository<UserWorkSpace, Long> {

	List<UserWorkSpace> findByUserName(String userName);

	List<UserWorkSpace> findByClassIdAndSubjectIdAndUserName(Long classId, Long subjectId, String userName);

	List<UserWorkSpace> findByClassIdAndSubjectIdAndChapterIdAndUserName(Long classId, Long subjectId, Long chapterId,
			String userName);

	List<UserWorkSpace> findByClassIdAndSubjectIdAndChapterIdAndUserNameAndTopicId(Long classId, Long subjectId,
			Long chapterId, String userName, Long topicId);
}
