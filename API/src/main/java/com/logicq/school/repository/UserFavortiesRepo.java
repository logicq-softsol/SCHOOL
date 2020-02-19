package com.logicq.school.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.logicq.school.model.Favorites;

@Repository
public interface UserFavortiesRepo extends JpaRepository<Favorites, Long> {

	List<Favorites> findByUserName(String userName);

	Favorites findByUserNameAndId(String userName, Long id);

	Favorites findByUserNameAndClassIdAndSubjectIdAndChapterIdAndTopicId(String userName, String classId,
			String subjectId, String chapterId, String topicId);

}
