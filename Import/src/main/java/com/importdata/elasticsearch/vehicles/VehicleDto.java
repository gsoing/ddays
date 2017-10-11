package com.importdata.elasticsearch.vehicles;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/**
 * Created by Anis AYACHI on 10/10/17.
 */
@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class VehicleDto {

    private String vin;
    private String brand;
    private int phase;
    private String modelLabel;
    private String  versionLabel;
    private Integer price;
    private String energy;
    private String vehicleType;
    private String images;
    private int pollution;
    private String type;
    private int children;
    private String use;
    private boolean ecolo;
    private int hobby;
    private String city;
}
