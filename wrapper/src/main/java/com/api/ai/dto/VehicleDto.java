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
    private String images;
    private String type;
    private String pollution;
    private String energy;
    private String vehicleType;
    private int children;
    private String use;
    private String ecolo;
    private String city;
    private String hobby;

}
