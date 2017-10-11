package com.api.ai.endpoint;

import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.api.ai.dto.AiApiRequestDto;
import com.api.ai.dto.FrontRequest;
import com.api.ai.dto.AiApiResponse;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
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


    @PostMapping("/chatBot")
    public AiApiResponse getResponse(@RequestBody FrontRequest frontRequest) {

        if (StringUtils.isEmpty(frontRequest.getLastAnswer())) {
           //Just call index
        }

        URI url = buildUrlFromRequest(frontRequest);
        RestTemplate restTemplate = new RestTemplate();

        HttpEntity<AiApiRequestDto> entity = new HttpEntity<>(AiApiRequestDto
                .builder()
                .query(frontRequest.getLastAnswer())
                .sessionId(frontRequest.getSessionId())
                .contexts(convertToArray(frontRequest.getContext()))
                .build(), setHeaders());


        AiApiResponse response = null;
        response = restTemplate.exchange(url, HttpMethod.POST, entity, AiApiResponse.class).getBody();

        //Call elastic service

        //return a FrontResponse Object
        return response;
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
