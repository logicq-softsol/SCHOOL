package com.logicq.school.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.logicq.school.model.UserWorkSpace;

@Repository
public interface WorkSpaceDetailsRepo extends JpaRepository<UserWorkSpace, String> {

	List<UserWorkSpace> findByUserName(String userName);

	List<UserWorkSpace> findByClassIdAndSubjectIdAndUserName(String classId, String subjectId, String userName);

	List<UserWorkSpace> findByClassIdAndSubjectIdAndChapterIdAndUserName(String classId, String subjectId, String chapterId,
			String userName);

	List<UserWorkSpace> findByClassIdAndSubjectIdAndChapterIdAndUserNameAndTopicId(String classId, String subjectId,
			String chapterId, String userName, String topicId);
}
