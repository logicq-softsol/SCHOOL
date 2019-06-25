package com.logicq.school.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.logicq.school.model.ClassDetails;

@Repository
public interface ClassesDetailsRepo extends JpaRepository<ClassDetails, Long> {

	ClassDetails findByName(String name);

}
