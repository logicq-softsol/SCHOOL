package com.logicq.school.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.logicq.school.model.ClassDetails;

@Repository
public interface ClassesDetailsRepo extends JpaRepository<ClassDetails, Long> {

	List<ClassDetails> findByUserId(Long userId);

	ClassDetails findByName(String name);

}
