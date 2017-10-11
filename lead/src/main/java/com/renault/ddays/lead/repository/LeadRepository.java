package com.renault.ddays.lead.repository;

import java.util.UUID;

import com.renault.ddays.lead.entity.LeadEntity;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created on 10/10/17.
 *
 */
public interface LeadRepository extends JpaRepository<LeadEntity, UUID> {

}
