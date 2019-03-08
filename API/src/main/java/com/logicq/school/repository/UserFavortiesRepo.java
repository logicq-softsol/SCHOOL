package com.logicq.school.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.logicq.school.model.Favorites;

@Repository
public interface UserFavortiesRepo extends JpaRepository<Favorites, Long> {

	List<Favorites> findByUserName(String userName);

	List<Favorites> findByUserNameAndType(String userName, String type);

	Favorites findByUserNameAndId(String userName, Long id);

	Favorites findByUserNameAndTypeAndTypeValue(String userName, String type, Long typeValue);
}
