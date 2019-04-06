package com.logicq.license.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.logicq.license.model.LicenseKey;

public interface LicenseKeyRepo extends JpaRepository<LicenseKey, Long> {

	LicenseKey findByHostName(String hostName);
}
