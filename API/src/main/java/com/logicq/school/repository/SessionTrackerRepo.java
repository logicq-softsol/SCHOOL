package com.logicq.school.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.logicq.school.model.SessionTracker;

public interface SessionTrackerRepo extends JpaRepository<SessionTracker, Long> {

	SessionTracker findByUserNameAndClassIdAndSubjectIdAndChapterIdAndTopicId(String userName, Long classId,
			Long subjectId, long chapterId, Long topicId);

	List<SessionTracker> findByStartTimeGreaterThanEqualAndUserName(Date currentDate, String userName);

	List<SessionTracker> findByStartTimeGreaterThanEqual(Date currentDate);

	@Query(value = "from SessionTracker t where t.startTime BETWEEN :startDate AND :endDate")
	public List<SessionTracker> getAllRecordsInBetweenDate(@Param("startDate") Date startDate,
			@Param("endDate") Date endDate);

	@Query(value = "from SessionTracker t where t.userName=:userName AND t.startTime BETWEEN :startDate AND :endDate")
	public List<SessionTracker> getAllRecordsInBetweenDate(@Param("userName") String userName,
			@Param("startDate") Date startDate, @Param("endDate") Date endDate);

}
