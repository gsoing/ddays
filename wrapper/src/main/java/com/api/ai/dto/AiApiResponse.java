package com.api.ai.dto;

import java.util.HashMap;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created on 10/10/17.
 *
 * @author Nabil Dahalani
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AiApiResponse {
    
    private Result result;
    private HashMap<String,Object> metadata;
    private HashMap<String,Object> contexts;


    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Result {

        private HashMap<String,Object> parameters;

    }

}
