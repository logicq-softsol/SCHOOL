package com.logicq.school.model;

import java.io.Serializable;
import java.util.Date;

public class Message  implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 5965502154363766089L;
	
	private Date timestamp;
	private String message;
	private String api;
	private String messageCode;
	


	public Message(Date timestamp, String message, String api, String messageCode) {
		super();
		this.timestamp = timestamp;
		this.message = message;
		this.api = api;
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



	public String getApi() {
		return api;
	}



	public void setApi(String api) {
		this.api = api;
	}



	public String getMessageCode() {
		return messageCode;
	}



	public void setMessageCode(String messageCode) {
		this.messageCode = messageCode;
	}



	@Override
	public String toString() {
		return "SucessMessage [timestamp=" + timestamp + ", message=" + message + ", api=" + api + ", messageCode="
				+ messageCode + "]";
	}
	
	
}
