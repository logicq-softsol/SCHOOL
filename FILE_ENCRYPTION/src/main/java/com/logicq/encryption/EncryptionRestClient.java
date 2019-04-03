package com.logicq.encryption;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.config.ClientConfig;
import com.sun.jersey.api.client.config.DefaultClientConfig;
import com.sun.jersey.api.json.JSONConfiguration;

public class EncryptionRestClient {

	public LicenseDetails validateLicenseForHostName(String hostName) {
		ClientConfig clientConfig = new DefaultClientConfig();
		clientConfig.getFeatures().put(JSONConfiguration.FEATURE_POJO_MAPPING, Boolean.TRUE);
		Client client = Client.create(clientConfig);

		WebResource webResource = client.resource("http://127.0.0.1:8080/license/api/school/license/" + hostName);
		ClientResponse response = webResource.accept("application/json").get(ClientResponse.class);

		if (response.getStatus() != 200) {
			throw new RuntimeException("Failed : HTTP error code : " + response.getStatus());
		}
		return response.getEntity(LicenseDetails.class);
	}

}
