package com.logicq.license.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.logicq.license.model.Message;

@Component
public class SucessHandlerUtils {

	@Autowired
	SchoolDateUtils schoolDateUtils;

	public Message handleSucessMessage(String code, String api, String message) {
		return new Message(schoolDateUtils.currentDate(), message, api, code);
	}

	public Message handleSucessMessage(String code, String api) {
		return new Message(schoolDateUtils.currentDate(), "", api, code);
	}

}
