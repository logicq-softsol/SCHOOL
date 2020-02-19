package com.logicq.school.utils;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
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
		LocalDateTime startDate = LocalDateTime.now(ZoneId.of(env.getProperty("school.date.zoneid")))
				.with(LocalTime.MIN);
		return Date.from(startDate.atZone(ZoneId.of(env.getProperty("school.date.zoneid"))).toInstant());

	}

	public Date find2mrEndDate() {
		LocalDateTime endDateTime = LocalDateTime.now(ZoneId.of(env.getProperty("school.date.zoneid"))).plusDays(1)
				.with(LocalTime.MAX);
		return Date.from(endDateTime.atZone(ZoneId.of(env.getProperty("school.date.zoneid"))).toInstant());

	}

	public Date findLastDayDateAccordingToType(long day) {
		LocalDateTime endDateTime = LocalDateTime.now(ZoneId.of(env.getProperty("school.date.zoneid"))).minusDays(day)
				.with(LocalTime.MIN);
		return Date.from(endDateTime.atZone(ZoneId.of(env.getProperty("school.date.zoneid"))).toInstant());

	}

	public Date currentDate() {
		LocalDateTime currentTime = LocalDateTime.now(ZoneId.of(env.getProperty("school.date.zoneid")));
		return Date.from(currentTime.atZone(ZoneId.of(env.getProperty("school.date.zoneid"))).toInstant());
	}

	public Date getExpiryDate(Integer days) {
		LocalDateTime currentTime = LocalDateTime.now(ZoneId.of(env.getProperty("school.date.zoneid")));
		currentTime = currentTime.plusDays(days);
		return Date.from(currentTime.atZone(ZoneId.of(env.getProperty("school.date.zoneid"))).toInstant());
	}

	public String currentDateWithString() {
		LocalDateTime currentTime = LocalDateTime.now(ZoneId.of(env.getProperty("school.date.zoneid")));
		return dtf.format(currentTime);
	}

	public Date getExpiryDateForExistingLicense(Integer days, Date activationDate) {
		LocalDateTime activateDate = LocalDateTime.ofInstant(activationDate.toInstant(),
				ZoneId.of(env.getProperty("school.date.zoneid")));
		LocalDateTime expiryDate = activateDate.plusDays(days);
		return Date.from(expiryDate.atZone(ZoneId.of(env.getProperty("school.date.zoneid"))).toInstant());
	}

	public long calculateRemaningDays( Date expiryDate) {
		LocalDateTime currentTime = LocalDateTime.now(ZoneId.of(env.getProperty("school.date.zoneid")));
		LocalDateTime expiryDt = LocalDateTime.ofInstant(expiryDate.toInstant(),
				ZoneId.of(env.getProperty("school.date.zoneid")));

		long diff = ChronoUnit.DAYS.between(currentTime, expiryDt);
		return diff;
	}

	public String getTodayDay() {
		return LocalDate.now(ZoneId.of(env.getProperty("school.date.zoneid"))).getDayOfWeek().name();
	}

}
