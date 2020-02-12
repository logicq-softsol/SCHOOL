package com.logicq.school.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.logicq.school.model.SchoolDetail;

public interface SchoolDetailsRepo extends JpaRepository<SchoolDetail, String> {

}
