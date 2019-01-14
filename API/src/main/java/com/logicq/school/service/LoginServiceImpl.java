package com.logicq.school.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.logicq.school.model.LoginDetails;
import com.logicq.school.model.User;
import com.logicq.school.repository.UserDetailsRepo;
import com.logicq.school.security.UserPrincipal;

@Service
@Transactional
public class LoginServiceImpl implements LoginService {

	@Autowired
	com.logicq.school.repository.LoginDetailsRepo loginDetailsRepo;

	@Autowired
	UserDetailsRepo userRegRepo;

	@Override
	public LoginDetails fetchUserLoginDetails(String userName) {
		return loginDetailsRepo.findByUserName(userName);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		LoginDetails loginDetails = loginDetailsRepo.findByUserName(username);
		User userDetails = userRegRepo.findByUserName(username);
		return UserPrincipal.create(userDetails, loginDetails);
	}
}
