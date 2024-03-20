package com.nashtech.contributionservice.controller;

import com.nashtech.contributionservice.entity.Nasher;
import com.nashtech.contributionservice.service.PasGo1Service;
import com.nashtech.contributionservice.service.Processor;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/cs")
@AllArgsConstructor
public class SecuredNasherController {
    private final Processor processor;
    private final PasGo1Service pasGo1Service;

    private static final Log log = LogFactory.getLog(SecuredNasherController.class);
    @PreAuthorize("hasAuthority('APPROLE_competency_insights_user')")
    @GetMapping("/sec/nashers")
    public Flux<Nasher> getAllNasher() {
        log.info("Enter into NasherController: Get all Nashers request");
        return processor.getNashers();
    }

    @PreAuthorize("hasAuthority('APPROLE_competency_insights_user')")
    @GetMapping("/sec/nasher/{empId}")
    public Mono<Nasher> getNasherById(@PathVariable String empId) {
        log.info("Enter into NasherController: Get Nasher by employee Id: " + empId);
        return processor.getNasherInfo(empId);
    }

    @PreAuthorize("hasAuthority('APPROLE_competency_insights_user')")
    @GetMapping("/sec/nasher/email/{email}")
    public Mono<Nasher> getNasherByEmail(@PathVariable String email) {
        log.info("Enter into NasherController: Get Nasher by email: " +  email);
        return processor.getNasherByEmail(email);
    }

    @PreAuthorize("hasAuthority('APPROLE_competency_insights_admin')")
    @PostMapping("/sec/nasher/save") // Temp basis to check firestore insertion
    public void saveNasher(@RequestBody Nasher nasher) {
        log.info("Enter into NasherController: Saving Nasher with Employee Id: " +  nasher.getEmpId());
        processor.saveNasher(nasher);
    }

    @PreAuthorize("hasAuthority('APPROLE_competency_insights_admin')")
    @GetMapping("/sec/trigger/pas")
    public String triggerPasService() {
        log.info("Enter into NasherController: Processing PAS request");
        pasGo1Service.callPassService();
        return "Successfully triggered Pas service";
    }

    @PreAuthorize("hasAuthority('APPROLE_competency_insights_admin')")
    @GetMapping("/sec/trigger/go1")
    public String triggerGo1Service() {
        log.info("Enter into NasherController: Processing GO1% request");
        pasGo1Service.callGo1Service();
        return "Successfully triggered Go1% service";
    }

}