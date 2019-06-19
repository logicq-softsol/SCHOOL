package com.logicq.school.utils;

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
				if (activationDetails.getActivationDays() >= 0
						&& activationDetails.getLastUpdate().compareTo(schoolDateUtils.currentDate()) < 0) {
					activationDetails.setLastUpdate(schoolDateUtils.currentDate());
					activationDetails.setActivationDays(activationDetails.getActivationDays() - 1);
				} else {
					activationDetails.setProductStatus("EXPIRED");
				}
				productActivationRepo.save(activationDetails);
			}

		}

	}

}
