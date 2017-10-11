package com.renault.ddays.lead.repository;

import javax.persistence.AttributeConverter;

import com.renault.ddays.lead.dto.DataLead;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Created on 10/10/17.
 */
public class LeadJsonConvertor implements AttributeConverter<DataLead, String> {

    private final static ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(DataLead dataLead) {
        try {
            return objectMapper.writeValueAsString(dataLead);
        } catch (Exception ex) {
            return null;
        }
    }

    @Override
    public DataLead convertToEntityAttribute(String dbData) {
        try {
            return objectMapper.readValue(dbData, DataLead.class);
        } catch (Exception ex) {
            return null;
        }
    }
}
