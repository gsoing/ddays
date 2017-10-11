package com.renault.ddays.lead.entity;

import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.renault.ddays.lead.dto.DataLead;
import com.renault.ddays.lead.repository.LeadJsonConvertor;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Created on 10/10/17.
 */
@Data
@Entity
@Table(name = "lead")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LeadEntity {
    @Id
    @Column(name = "id")
    @org.hibernate.annotations.Type(type = "org.hibernate.type.PostgresUUIDType")
    private UUID id;

    @Column(nullable = true, columnDefinition = "jsonb")
    @Convert(converter = LeadJsonConvertor.class)
    private DataLead data;

}
