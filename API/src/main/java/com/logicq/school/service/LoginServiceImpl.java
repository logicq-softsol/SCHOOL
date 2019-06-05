package com.logicq.school.service;

import javax.transaction.Transactional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.logicq.school.model.ActivationDetails;
import com.logicq.school.model.LoginDetails;
import com.logicq.school.model.User;
import com.logicq.school.repository.ProductActivationRepo;
import com.logicq.school.repository.UserDetailsRepo;
import com.logicq.school.security.UserPrincipal;
import com.logicq.school.utils.SchoolDateUtils;
import com.logicq.school.utils.SchoolSecurityUtils;

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
