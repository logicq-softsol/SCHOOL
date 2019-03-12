package com.logicq.license.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class SchoolFileNotFoundException extends RuntimeException {
	public SchoolFileNotFoundException(String message) {
		super(message);
	}

	public SchoolFileNotFoundException(String message, Throwable cause) {
		super(message, cause);
	}
}
