package com.logicq.license.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.logicq.license.model.LoginDetails;
import com.logicq.license.model.User;
import com.logicq.license.repository.UserDetailsRepo;
import com.logicq.license.security.UserPrincipal;

@Service
@Transactional
public class LoginServiceImpl implements LoginService {

	@Autowired
	com.logicq.license.repository.LoginDetailsRepo loginDetailsRepo;

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
