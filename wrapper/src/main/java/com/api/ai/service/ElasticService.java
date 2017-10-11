package com.api.ai.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import com.api.ai.dto.FrontResponse;
import com.api.ai.dto.VehicleDto;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.client.RestTemplate;

/**
 * Created on 11/10/17.
 *
 * @author Nabil Dahalani
 */
@Service
public class ElasticService {

    private static final String URL = "http://localhost:9200/vehicles/_search";
    private final List<String> authorizedParam = Arrays.asList("children", "hobby", "ecolo", "use", "city", "price");

    public FrontResponse getAllVehicle(HashMap<String, Object> currentParams) throws IOException {
        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper mapper = new ObjectMapper();

        String jsonResult = restTemplate.getForObject(URL, String.class);
        JsonNode node = mapper.readValue(jsonResult, JsonNode.class);

        List<JsonNode> arrays = node.findValues("_source");

        List<VehicleDto> vehicles = new ArrayList<>();
        for (JsonNode jsonNode : arrays) {
            vehicles.add(mapper.treeToValue(jsonNode, VehicleDto.class));
        }

        return FrontResponse.builder()
                .vehicles(vehicles)
                .currentParams(currentParams)
                .total(node.findValue("hits").get("total").asInt())
                .build();
    }

    public FrontResponse getVehicleFromParams(HashMap<String, Object> params) throws IOException {
        List<VehicleDto> vehicles = new ArrayList<>();
        int total = 0;

        RestTemplate restTemplate = new RestTemplate();
        ObjectMapper mapper = new ObjectMapper();

        System.out.print(URL + "?q=" + buildUrl(params));
        String val = restTemplate.getForObject(URL + "?q=" + buildUrl(params), String.class);
        JsonNode node = mapper.readValue(val, JsonNode.class);

        List<JsonNode> arrays = node.findValues("_source");
        for (JsonNode jsonNode : arrays) {
            vehicles.add(mapper.treeToValue(jsonNode, VehicleDto.class));
        }

        total = node.findValue("hits").get("total").asInt();

        return FrontResponse.builder()
                .vehicles(vehicles)
                .currentParams(params)
                .total(total)
                .build();
    }


    private String buildUrl(HashMap<String, Object> params) {
        StringBuilder stringBuilder = new StringBuilder();
        params.entrySet().stream().forEach(a ->
                {
                    if (authorizedParam.contains(a.getKey())) {
                        if (a.getKey().equals("children") || a.getKey().equals("hobby")) {
                            stringBuilder.append(a.getKey()).append(":").append("[" + a.getValue() + " TO *]").append(" AND ");
                        } else if (a.getKey().equals("price")) {
                            stringBuilder.append(a.getKey()).append(":").append("[ 0 TO " + a.getValue() + "]").append(" AND ");
                        } else {
                            stringBuilder.append(a.getKey()).append(":").append(a.getValue()).append(" AND ");
                        }
                    }
                }
        );
        int start = stringBuilder.lastIndexOf(" AND ");

        String result;
        if (start > 0) {
            result = stringBuilder.substring(0, start).toString();
        } else {
            result = stringBuilder.toString();
        }

        if (result.endsWith("q=")) {
            result += "*";
        }
        return result;
    }

}




