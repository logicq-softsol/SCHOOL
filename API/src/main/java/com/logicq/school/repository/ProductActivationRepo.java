package com.logicq.school.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.logicq.school.model.ActivationDetails;

@Repository
public interface ProductActivationRepo extends JpaRepository<ActivationDetails, Long> {

	ActivationDetails findByActivationKey(String activationKey);

}
