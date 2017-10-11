package com.importdata.elasticsearch.vehicles;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class ImportApplication implements CommandLineRunner {

	private byte[] readRessource(String name) throws IOException {
		InputStream resource = getClass().getClassLoader().getResourceAsStream( name);
		byte[] jsonRessource = new byte[resource.available()];
		resource.read(jsonRessource);
		return jsonRessource;
	}

	@Value("${elasticSearch.host:localhost}")
	private String elastiSearchHost;

	@Value("${elasticSearch.port:9200}")
	private int elasticSearchPort;

	@Override
	public void run(String... args) throws Exception {

		RestTemplate restTemplate = new RestTemplate();
		ObjectMapper objectMapper = new ObjectMapper();

		String url = "http://"+elastiSearchHost+":"+elasticSearchPort+"/vehicles/vehicle/";
		List<VehicleDto> list = objectMapper.readValue(readRessource("vehicles2.json"),objectMapper.getTypeFactory()
				.constructCollectionType(List.class, VehicleDto.class));
		HttpHeaders httpHeaders =new HttpHeaders();
		httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON.toString());
		list.stream().forEach(vehicleDto -> {
			HttpEntity<VehicleDto> request = new HttpEntity<>(vehicleDto, httpHeaders);
			restTemplate.exchange(url + vehicleDto.getVin(), HttpMethod.PUT, request, VehicleDto.class );


		});
	}

	public static void main(String[] args) {

		SpringApplication.run(ImportApplication.class, "--debug").close();;
	}
}
