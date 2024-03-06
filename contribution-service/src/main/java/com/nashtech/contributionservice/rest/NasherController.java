package com.nashtech.contributionservice.rest;

import com.nashtech.contributionservice.entity.Nasher;
import com.nashtech.contributionservice.service.PasGo1Service;
import com.nashtech.contributionservice.service.Processor;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@RestController
@RequestMapping("/api")
@AllArgsConstructor
@Slf4j
public class NasherController {
    private final Processor processor;
    private final PasGo1Service pasGo1Service;

    @GetMapping("nashers")
    public Flux<Nasher> getAllNasher() {
        log.info("Enter into NasherController: Get all Nashers request");
        return processor.getNashers();
    }

    @GetMapping("nasher/{empId}")
    public Mono<Nasher> getNasherById(@PathVariable String empId) {
        log.info("Enter into NasherController: Get Nasher by employee Id: {}",empId);
        return processor.getNasherInfo(empId);
    }

    @PostMapping("nasher/save") // Temp basis to check firestore insertion
    public void saveNasher(@RequestBody Nasher nasher) {
        log.info("Enter into NasherController: Saving Nasher with Employee Id: {} ", nasher.getEmpId());
        processor.saveNasher(nasher);
    }

    @GetMapping("trigger/pas")
    public String triggerPasService() {
        log.info("Enter into NasherController: Processing PAS request");
        pasGo1Service.callPassService();
        return "Successfully triggered Pas service";
    }

    @GetMapping("trigger/go1")
    public String triggerGo1Service() {
        log.info("Enter into NasherController: Processing GO1% request");
        pasGo1Service.callGo1Service();
        return "Successfully triggered Go1% service";
    }

}