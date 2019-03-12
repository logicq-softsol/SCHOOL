package com.logicq.license.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.logicq.license.model.LicenseDetails;

@Repository
public interface LicenseDetailRepo extends JpaRepository<LicenseDetails, String> {

	LicenseDetails findByHostName(String hostName);

	LicenseDetails findByHostNameAndLicenseKey(String hostName, String licenseKey);

}
