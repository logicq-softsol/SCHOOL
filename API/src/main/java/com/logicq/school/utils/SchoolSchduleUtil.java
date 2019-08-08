package com.logicq.school.utils;

import java.time.temporal.ChronoUnit;
import java.util.concurrent.TimeUnit;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.logicq.school.model.ActivationDetails;
import com.logicq.school.repository.ProductActivationRepo;

@Component
public class SchoolSchduleUtil {

	@Autowired
	SchoolSecurityUtils schoolSecurityUtils;

	@Autowired
	ProductActivationRepo productActivationRepo;

	@Autowired
	SchoolDateUtils schoolDateUtils;

	@Async
	@Scheduled(cron = "0 0/15 * * * ?")
	public void run() throws Exception {
		String hostName = schoolSecurityUtils.getSystemHostName();
		if (!StringUtils.isEmpty(hostName)) {
			ActivationDetails activationDetails = productActivationRepo.findByActivationFor(hostName);
			if (null != activationDetails) {
				activationDetails.setLastUpdate(schoolDateUtils.findTodayStartDate());
				if (activationDetails.getExpiryDate().compareTo(activationDetails.getLastUpdate()) >= 0) {
					long diff = activationDetails.getExpiryDate().getTime()
							- activationDetails.getLastUpdate().getTime();
					long day = TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
					activationDetails.setActivationDays(day);
					activationDetails.setProductStatus("ACTIVE");
					productActivationRepo.save(activationDetails);
				} else {
					activationDetails.setProductStatus("EXPIRED");
					activationDetails.setActivationDays(0);
					productActivationRepo.save(activationDetails);
				}
			}

		}

	}

}
