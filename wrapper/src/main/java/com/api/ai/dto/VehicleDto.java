package com.api.ai.dto;

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
public class VehicleDto {

    private String vin;
    private String brand;
    private String phase;
    private String modelLabel;
    private String versionLabel;
    private double price;
    private double priceHT;
    private List<Images> images;
    private String type;
    private String pollution;
    private String energy;
    private String vehicleType;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Images {
        private String type;
        private String url;
    }


}
