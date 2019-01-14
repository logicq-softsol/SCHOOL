package com.logicq.school.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.logicq.school.model.CompanyDetails;
import com.logicq.school.model.LoginDetails;

@Repository
public interface CompanyDetailsRepo extends JpaRepository<CompanyDetails, Long> {

}
