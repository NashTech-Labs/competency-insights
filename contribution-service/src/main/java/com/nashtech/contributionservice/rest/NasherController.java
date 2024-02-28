package com.nashtech.contributionservice.rest;

import com.nashtech.contributionservice.entity.Nasher;
import com.nashtech.contributionservice.service.PasGo1Service;
import com.nashtech.contributionservice.service.Processor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/nasher")
public class NasherController {
    private final Processor processor;
    private final PasGo1Service pasGo1Service;

    public NasherController(Processor processor, PasGo1Service pasGo1Service) {
        this.processor = processor;
        this.pasGo1Service = pasGo1Service;
    }

    @GetMapping
    public List<Nasher> getAllNasher() {
        return processor.getNashers();
    }

    @GetMapping("get/{empId}")
    public Nasher getNasherById(@PathVariable String empId) {
        return processor.getNasherInfo(empId);
    }

    @PostMapping("save") // Temp basis to check firestore insertion
    public void saveNasher(@RequestBody Nasher nasher) {
        processor.saveNasher(nasher);
    }

    @GetMapping("trigger/pas")
    public String triggerPasService() {
        pasGo1Service.callPassService();
        return "Successfully triggered Pas service";
    }

    @GetMapping("trigger/go1")
    public String triggerGo1Service() {
        pasGo1Service.callGo1Service();
        return "Successfully triggered Go1% service";
    }

}