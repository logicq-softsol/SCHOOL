package com.logicq.school.utils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class SchoolDateUtils {

	@Autowired
	Environment env;

	static DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");

	public Date findTodayStartDate() {
		LocalDateTime startDate = LocalDateTime.now(ZoneId.of(env.getProperty("reckon.date.zoneid"))).with(LocalTime.MIN);
		return Date.from(startDate.atZone(ZoneId.of(env.getProperty("reckon.date.zoneid"))).toInstant());

	}

	public Date find2mrEndDate() {
		LocalDateTime endDateTime = LocalDateTime.now(ZoneId.of(env.getProperty("reckon.date.zoneid"))).plusDays(1)
				.with(LocalTime.MAX);
		return Date.from(endDateTime.atZone(ZoneId.of(env.getProperty("reckon.date.zoneid"))).toInstant());

	}

	public Date currentDate() {
		LocalDateTime currentTime = LocalDateTime.now(ZoneId.of(env.getProperty("reckon.date.zoneid")));
		return Date.from(currentTime.atZone(ZoneId.of(env.getProperty("reckon.date.zoneid"))).toInstant());
	}

	public String currentDateWithString() {
		LocalDateTime currentTime = LocalDateTime.now(ZoneId.of(env.getProperty("reckon.date.zoneid")));
		return dtf.format(currentTime);
	}
	
	public String getTodayDay() {
		return LocalDate.now(ZoneId.of(env.getProperty("reckon.date.zoneid"))).getDayOfWeek().name();
	}



}
