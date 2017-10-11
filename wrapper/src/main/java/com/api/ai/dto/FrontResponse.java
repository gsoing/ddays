package com.api.ai.dto;

import java.util.HashMap;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created on 11/10/17.
 *
 * @author Nabil Dahalani
 */

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FrontResponse {
    
    private List<VehicleDto> vehicles;
    private HashMap<String, Object> currentParams;
    private int total;

}
