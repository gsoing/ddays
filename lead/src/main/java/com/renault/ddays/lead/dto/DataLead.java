package com.renault.ddays.lead.dto;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created on 10/10/17.
 */
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class DataLead implements Serializable {

    private String vin;
    private String brand;
    private String phase;
    private String modelLabel;
    private String versionLabel;
    private Double price;
    private Double priceHT;
    private String imagesURL;
    private String type;
    private String pollution;
    private String energy;
    private String vehicleType;
    private Double maxPrice;
    private String firstName;
    private String lastName;
    private String adresse;
    private String leadDate;
    private int age;
    private String cityOrLanscape;
    private String bigOrSmallTrunck;
    private boolean greenCar;
    private String mainOrSecondaryCar;
    private String sportsOrFamilyCar;
    private boolean allOption;
    private boolean availableNow;
    private boolean nearOfYourPlace;
    private String availableNowRate;
    private String sportsOrFamilyCarRate;
    private String bigOrSmallTrunckRate;
    private String cityOrLanscapeRate;
    private String modelLabelRate;
    private String maxPriceRate;
    private String vehicleTypeRate;
    private String energyRate;

}
