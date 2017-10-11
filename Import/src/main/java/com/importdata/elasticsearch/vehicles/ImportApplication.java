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
                processFile(resource, httpHeaders);
            } catch (Exception e) {
              log.error("error processing file", e);
            }
        });
    }

    private void processFile(Resource resource, HttpHeaders httpHeaders) throws Exception {

        String url = "http://" + elastiSearchHost + ":" + elasticSearchPort + indexName+"/vehicle/";
        List<VehicleDto> list = objectMapper.readValue(resource.getInputStream(), objectMapper.getTypeFactory()
                .constructCollectionType(List.class, VehicleDto.class));

        list.stream().forEach(vehicleDto -> {
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
}
