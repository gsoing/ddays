package com.renault.ddays.lead.endpoint;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;
import javax.servlet.ServletContext;

import com.renault.ddays.lead.dto.DataLead;
import com.renault.ddays.lead.entity.LeadEntity;
import com.renault.ddays.lead.repository.LeadRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created on 10/10/17.
 */
@Slf4j
@Validated
@RestController
@RequestMapping(LeadController.PATH)
@RequiredArgsConstructor
public class LeadController {

    public static final String PATH = "/api/lead";
    private final LeadRepository leadRepository;
    private final ServletContext context;


    @Transactional
    @PostMapping
    public ResponseEntity createLead(@RequestBody final DataLead dataLead) throws URISyntaxException {
        LocalDateTime now = LocalDateTime.now();
        dataLead.setLeadDate(now.toString());
        final LeadEntity leadEntity = LeadEntity
                .builder()
                .id(UUID.randomUUID())
                .data(dataLead)
                .build();
        leadRepository.save(leadEntity);
        return ResponseEntity.created(new URI(context.getContextPath() + PATH + "/" + leadEntity.getId())).build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<DataLead>> getAll() {
        return ResponseEntity.ok(leadRepository.findAll().stream().map(LeadEntity::getData).collect(Collectors.toList()));
    }


}
