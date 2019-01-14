package com.logicq.school.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.logicq.school.model.LoginDetails;

public interface LoginService  extends UserDetailsService {


	LoginDetails fetchUserLoginDetails(String userName);

}
