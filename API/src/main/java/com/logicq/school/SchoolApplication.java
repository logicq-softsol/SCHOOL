package com.logicq.school;

import java.net.InetAddress;
import java.net.UnknownHostException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationListener;
import org.springframework.core.env.Environment;
import org.springframework.scheduling.annotation.EnableAsync;

import com.logicq.school.vo.FileStorageProperties;

@SpringBootApplication
@EnableConfigurationProperties({ FileStorageProperties.class })
@EnableAsync
public class SchoolApplication extends SpringBootServletInitializer
		implements ApplicationListener<ApplicationReadyEvent> {

	@Autowired
	private ApplicationContext applicationContext;

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(SchoolApplication.class);
	}

	public static void main(String[] args) throws Exception {
		SpringApplication.run(SchoolApplication.class, args);
	}

	@Override
	public void onApplicationEvent(ApplicationReadyEvent event) {
		try {
			String hostName = InetAddress.getLocalHost().getHostName();
			String licenseKey = applicationContext.getBean(Environment.class).getProperty("license_key");

		} catch (UnknownHostException e) {
			e.printStackTrace();
		}
	}

}
