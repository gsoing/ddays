package com.api.ai.dto;

import java.util.HashMap;

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
public class FrontRequest {

    private String lastAnswer;
    private String sessionId;
    private HashMap<String, Object> currentParams;
    private String context;

}
