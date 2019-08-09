package com.logicq.school.exception;

import java.io.Serializable;
import java.util.Date;

public class ErrorDetails  implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 4965840823582868271L;
	private Date timestamp;
	private String message;
	private String details;
	private String messageCode;

	public ErrorDetails(Date timestamp, String message, String details, String messageCode) {
		super();
		this.timestamp = timestamp;
		this.message = message;
		this.details = details;
		this.messageCode = messageCode;
	}

	/**
	 * @return the timestamp
	 */
	public Date getTimestamp() {
		return timestamp;
	}


	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}

	
	/**
	 * @return the details
	 */
	public String getDetails() {
		return details;
	}

	
	/**
	 * @return the messageCode
	 */
	public String getMessageCode() {
		return messageCode;
	}


	
}
