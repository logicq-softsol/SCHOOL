package com.logicq.license.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.logicq.license.model.LoginDetails;

@Repository
public interface LoginDetailsRepo extends JpaRepository<LoginDetails, Long> {

	LoginDetails findByUserName(String userName);


}
