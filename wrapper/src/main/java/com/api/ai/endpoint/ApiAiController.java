package com.api.ai.endpoint;

import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.api.ai.dto.AiApiRequestDto;
import com.api.ai.dto.AiApiResponse;
import com.api.ai.dto.FrontRequest;
import com.api.ai.dto.FrontResponse;
import com.api.ai.service.ElasticService;
import javafx.util.Builder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * Created on 10/10/17.
 *
 * @author Nabil Dahalani
 */

@RestController
public class ApiAiController {

    private static final String API_KEY = "51a68d28275d436fb78dd0f5571d1403";
    @Autowired
    private ElasticService elasticService;


    @CrossOrigin("*")
    @PostMapping("/chatBot")
    public FrontResponse getResponse(@RequestBody(required = false) FrontRequest frontRequest) throws IOException {

        if (StringUtils.isEmpty(frontRequest.getLastAnswer())) {
            return elasticService.getAllVehicle(frontRequest.getCurrentParams());
        }

        HashMap<String, Object> mergedMap = new HashMap<>();
        RestTemplate restTemplate = new RestTemplate();
        URI url = buildUrlFromRequest(frontRequest);

        HttpEntity<AiApiRequestDto> entity = buildRequestEntity(frontRequest);

        AiApiResponse response = restTemplate.exchange(url, HttpMethod.POST, entity, AiApiResponse.class).getBody();
        System.out.println(response);

        if (frontRequest.getCurrentParams() != null) {
            mergedMap.putAll(frontRequest.getCurrentParams());
        }

        if (response.getResult().getParameters() != null) {
            mergedMap.putAll(response.getResult().getParameters());
        }

        System.out.println(mergedMap);

        FrontResponse frontResponse = FrontResponse.builder().build();
        if (CollectionUtils.isEmpty(mergedMap)) {
            frontResponse = elasticService.getAllVehicle(mergedMap);
        } else {
            frontResponse = elasticService.getVehicleFromParams(mergedMap);
        }
        return frontResponse;
    }


    private HttpEntity<AiApiRequestDto> buildRequestEntity(FrontRequest frontRequest) {
        AiApiRequestDto requestDto = AiApiRequestDto
                .builder()
                .query(frontRequest.getLastAnswer())
                .sessionId(frontRequest.getSessionId())
                .contexts(convertToArray(frontRequest.getContext()))
                .build();

        System.out.println("Resquest to AiAPi : " + requestDto);
        return new HttpEntity<>(requestDto, setHeaders());
    }

    private List<HashMap<String, Object>> convertToArray(String value) {
        HashMap<String, Object> map = new HashMap<>();
        map.put("name", value);
        List<HashMap<String, Object>> mapList = new ArrayList<>();
        mapList.add(map);
        return mapList;
    }

    private HttpHeaders setHeaders() {
        //Init headers
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + API_KEY);
        headers.add("Content-type", MediaType.APPLICATION_JSON_UTF8.toString());
        return headers;
    }

    private URI buildUrlFromRequest(FrontRequest frontRequest) {
        return UriComponentsBuilder.fromHttpUrl("https://api.api.ai/v1/query")
                .queryParam("v", "20170712")
                .build()
                .encode()
                .toUri();
    }

}