package com.nashtech.contributionservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cs")
public class StatusController {

    @GetMapping
    public String appRunning(){
        return "Contribution Service is Running...";
    }
}
