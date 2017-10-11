package com.importdata.elasticsearch.vehicles;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.EmbeddedServletContainerAutoConfiguration;
import org.springframework.boot.autoconfigure.web.WebMvcAutoConfiguration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.ResourcePatternUtils;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication(exclude = { EmbeddedServletContainerAutoConfiguration.class,
        WebMvcAutoConfiguration.class })
@Slf4j
public class ImportApplication implements CommandLineRunner {

    @Value("${elasticSearch.host:localhost}")
    private String elastiSearchHost;

    @Value("${elasticSearch.port:9200}")
    private int elasticSearchPort;

    @Value("${elasticSearch.indexName}")
    private String indexName;

    @Autowired
    private ResourceLoader resourceLoader;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ObjectMapper objectMapper;

	Resource[] loadResources(String pattern) throws IOException {
		return ResourcePatternUtils.getResourcePatternResolver(resourceLoader).getResources(pattern);
	}

    @Override
    public void run(String... args) throws Exception {
        log.info("Deleting the current index");
        deleteIndex();
        Resource[] resources = loadResources("classpath*:*.json");
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON.toString());

        Arrays.stream(resources).forEach(resource -> {
            try {
				System.out.println(resource.getFilename());
				processFile(resource, httpHeaders);
            } catch (Exception e) {
              log.error("error processing file", e);
            }
        });
    }

    private void processFile(Resource resource, HttpHeaders httpHeaders) throws Exception {

        String url = "http://" + elastiSearchHost + ":" + elasticSearchPort + indexName+"/vehicle/";
        List<VehicleDto> vehicleDtoList = objectMapper.readValue(resource.getInputStream(), objectMapper.getTypeFactory()
                .constructCollectionType(List.class, VehicleDto.class));

		mapVehiclesWithCriteria(vehicleDtoList);

        vehicleDtoList.parallelStream().forEach(vehicleDto -> {
            HttpEntity<VehicleDto> request = new HttpEntity<>(vehicleDto, httpHeaders);
            restTemplate.exchange(url + vehicleDto.getVin(), HttpMethod.PUT, request, VehicleDto.class);
        });
    }

    private void deleteIndex() {
        restTemplate.delete("http://" + elastiSearchHost + ":" + elasticSearchPort + indexName);
    }

    public static void main(String[] args) {
        SpringApplication.run(ImportApplication.class, "--debug").close();
    }


	// Map vehicles with new criteria
	void mapVehiclesWithCriteria(List<VehicleDto> vehicles) {
		for(VehicleDto vehicle : vehicles) {
			//TODO : mettre le type du dto vehicule à la place de Object
			switch (vehicle.getModelLabel().toUpperCase()) {
				case "CAPTUR" :
					vehicle.setChildren(2);
					vehicle.setUse("hobby");
					vehicle.setEcolo(false);
					vehicle.setCity("city");
					vehicle.setHobby(0);
					break;
				case "CLIO" :
					vehicle.setChildren(2);
					vehicle.setUse("daily");
					vehicle.setEcolo(false);
					vehicle.setCity("city");
					vehicle.setHobby(0);
					break;
				case "CLIO ESTATE" :
					vehicle.setChildren(2);
					vehicle.setUse("daily");
					vehicle.setEcolo(false);
					vehicle.setCity("city");
					vehicle.setHobby(1);
					break;
				case "GRAND SCENIC" :
					vehicle.setChildren(6);
					vehicle.setUse("hobby");
					vehicle.setEcolo(false);
					vehicle.setCity("city");
					vehicle.setHobby(1);
					break;
				case "KADJAR" :
					vehicle.setChildren(3);
					vehicle.setUse("hobby");
					vehicle.setEcolo(false);
					vehicle.setCity("countryside");
					vehicle.setHobby(1);
					break;
				case "KANGOO VP" :
				case "NOUVEAU TRAFIC COMBI" :
					vehicle.setChildren(4);
					vehicle.setUse("daily");
					vehicle.setEcolo(false);
					vehicle.setCity("countryside");
					vehicle.setHobby(1);
					break;
				case "MASTER TRANSPORT DE PERSONNES" :
					vehicle.setChildren(8);
					vehicle.setUse("daily");
					vehicle.setEcolo(false);
					vehicle.setCity("countryside");
					vehicle.setHobby(1);
					break;
				case "MEGANE ESTATE" :
				case "SCENIC" :
					vehicle.setChildren(4);
					vehicle.setUse("daily");
					vehicle.setEcolo(false);
					vehicle.setCity("city");
					vehicle.setHobby(1);
					break;
				case "MEGANE SOCIETE" :
					vehicle.setChildren(0);
					vehicle.setUse("daily");
					vehicle.setEcolo(false);
					vehicle.setCity("countryside");
					vehicle.setHobby(0);
					break;
				case "NOUVEAU CAPTUR" :
					vehicle.setChildren(2);
					vehicle.setUse("hobby");
					vehicle.setEcolo(false);
					vehicle.setCity("city");
					vehicle.setHobby(1);
					break;
				case "NOUVEAU KOLEOS" :
					vehicle.setChildren(2);
					vehicle.setUse("hobby");
					vehicle.setEcolo(false);
					vehicle.setCity("countryside");
					vehicle.setHobby(1);
					break;
				case "NOUVEL ESPACE" :
					vehicle.setChildren(5);
					vehicle.setUse("daily");
					vehicle.setEcolo(false);
					vehicle.setCity("city");
					vehicle.setHobby(1);
					break;
				case "NOUVELLE MEGANE BERLINE" :
					vehicle.setChildren(2);
					vehicle.setUse("daily");
					vehicle.setEcolo(false);
					vehicle.setCity("countryside");
					vehicle.setHobby(0);
					break;
				case "NOUVELLE TWINGO" :
					vehicle.setChildren(0);
					vehicle.setUse("hobby");
					vehicle.setEcolo(false);
					vehicle.setCity("city");
					vehicle.setHobby(0);
					break;
				case "TALISMAN" :
					vehicle.setChildren(2);
					vehicle.setUse("daily");
					vehicle.setEcolo(false);
					vehicle.setCity("countryside");
					vehicle.setHobby(1);
					break;
				case "TALISMAN Estate" :
					vehicle.setChildren(3);
					vehicle.setUse("daily");
					vehicle.setEcolo(false);
					vehicle.setCity("countryside");
					vehicle.setHobby(1);
					break;
				case "TWIZY" :
					vehicle.setChildren(0);
					vehicle.setUse("hobby");
					vehicle.setEcolo(true);
					vehicle.setCity("city");
					vehicle.setHobby(0);
					break;
				case "ZOE" :
					vehicle.setChildren(1);
					vehicle.setUse("daily");
					vehicle.setEcolo(true);
					vehicle.setCity("city");
					vehicle.setHobby(0);
					break;

			}
		}
	}
}
