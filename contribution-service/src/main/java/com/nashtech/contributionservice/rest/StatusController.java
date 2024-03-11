package com.nashtech.contributionservice.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatusController {

    @GetMapping
    public String appRunning(){
        return "Contribution Service is Running...";
    }
}
