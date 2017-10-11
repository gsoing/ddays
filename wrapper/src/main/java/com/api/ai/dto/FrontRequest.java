package com.api.ai.dto;

import java.util.HashMap;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.internal.Nullable;
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

    @Nullable
    private String lastAnswer;

    private String sessionId;

    @Nullable
    private HashMap<String, Object> currentParams;

    @Nullable
    private String context;

}
