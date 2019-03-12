package com.logicq.license.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.logicq.license.model.User;

@Repository
@Transactional
public interface UserDetailsRepo extends JpaRepository<User, Long> {

	User findByUserName(String userName);

}
