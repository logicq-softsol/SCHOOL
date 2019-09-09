package com.logicq.encryption;

import com.logicq.encryption.model.LicenseDetails;
import com.logicq.encryption.model.LicenseKey;
import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.config.ClientConfig;
import com.sun.jersey.api.client.config.DefaultClientConfig;
import com.sun.jersey.api.json.JSONConfiguration;

public class EncryptionRestClient {

	public LicenseDetails getLicenseForHostName(String hostName) {
		try {
			ClientConfig clientConfig = new DefaultClientConfig();
			clientConfig.getFeatures().put(JSONConfiguration.FEATURE_POJO_MAPPING, Boolean.TRUE);
			Client client = Client.create(clientConfig);
			WebResource webResource = client
					.resource("http://35.226.104.219:8080/license/api/school/license/" + hostName);
			ClientResponse response = webResource.accept("application/json").get(ClientResponse.class);

			if (response.getStatus() != 200) {
				throw new Exception("Failed : HTTP error code : " + response.getStatus());
			} else {
				return response.getEntity(LicenseDetails.class);
			}
		} catch (Throwable ex) {
			System.out.println("No valid license exist for this host : " + hostName);
		}
		return null;

	}

	public LicenseKey getLicenseKeyForHostName(String hostName) {
		try {
			ClientConfig clientConfig = new DefaultClientConfig();
			clientConfig.getFeatures().put(JSONConfiguration.FEATURE_POJO_MAPPING, Boolean.TRUE);
			Client client = Client.create(clientConfig);
			WebResource webResource = client
					.resource("http://35.226.104.219:8080/license/api/school/licenseKey/" + hostName);
			ClientResponse response = webResource.accept("application/json").get(ClientResponse.class);

			if (response.getStatus() != 200) {
				throw new Exception("Failed : HTTP error code : " + response.getStatus());
			} else {
				return response.getEntity(LicenseKey.class);
			}
		} catch (Throwable ex) {
			System.out.println("No valid license exist for this host : " + hostName);
		}
		return null;

	}

}
