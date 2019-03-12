package com.logicq.license.service;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.logicq.license.model.LoginDetails;

public interface LoginService  extends UserDetailsService {


	LoginDetails fetchUserLoginDetails(String userName);

}
