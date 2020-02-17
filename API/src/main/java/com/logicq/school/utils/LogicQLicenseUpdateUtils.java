package com.logicq.school.utils;

import java.util.concurrent.TimeUnit;

import javax.validation.ValidationException;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.logicq.school.model.ActivationDetails;
import com.logicq.school.repository.ProductActivationRepo;

@Component
public class LogicQLicenseUpdateUtils {

	@Autowired
	SchoolSecurityUtils schoolSecurityUtils;

	@Autowired
	ProductActivationRepo productActivationRepo;

	@Autowired
	SchoolDateUtils schoolDateUtils;

	public void updateLicense(String hostName, ActivationDetails activationDeatils) throws Exception {
		if (!StringUtils.isEmpty(hostName) && null != activationDeatils) {
			activationDeatils.setLastUpdate(schoolDateUtils.findTodayStartDate());
			if (activationDeatils.getExpiryDate().compareTo(activationDeatils.getLastUpdate()) >= 0) {
				long diff = activationDeatils.getExpiryDate().getTime() - activationDeatils.getLastUpdate().getTime();
				long day = TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
				if (day > activationDeatils.getActivationDays()) {
					activationDeatils.setProductStatus("EXPIRED");
					activationDeatils.setActivationDays(0);
					throw new ValidationException(
							"ERROR,Product Expired Because Someone change system date after produt install...");
				} else {
					activationDeatils.setActivationDays(day);
					activationDeatils.setProductStatus("ACTIVE");
				}
				productActivationRepo.save(activationDeatils);
			} else {
				activationDeatils.setProductStatus("EXPIRED");
				activationDeatils.setActivationDays(0);
				productActivationRepo.save(activationDeatils);
			}
		} else {
			throw new ValidationException("ERROR-LOGIN,Check Product Licence for this system...");
		}

	}

	public void updateLicense() throws Exception {
		String hostName = schoolSecurityUtils.getSystemHostName();
		if (!StringUtils.isEmpty(hostName)) {
			ActivationDetails activationDetails = productActivationRepo.findByActivationFor(hostName);
			updateLicense(hostName, activationDetails);

		}

	}

}
