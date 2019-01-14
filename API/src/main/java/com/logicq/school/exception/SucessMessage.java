package com.logicq.school.exception;

import java.io.Serializable;
import java.util.Date;

public class SucessMessage  implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 5965502154363766089L;
	
	private Date timestamp;
	private String message;
	private String messageCode;
	


	public SucessMessage(Date timestamp, String message, String messageCode) {
		super();
		this.timestamp = timestamp;
		this.message = message;
		this.messageCode = messageCode;
	}



	public Date getTimestamp() {
		return timestamp;
	}



	public void setTimestamp(Date timestamp) {
		this.timestamp = timestamp;
	}



	public String getMessage() {
		return message;
	}



	public void setMessage(String message) {
		this.message = message;
	}



	public String getMessageCode() {
		return messageCode;
	}



	public void setMessageCode(String messageCode) {
		this.messageCode = messageCode;
	}



	
}
