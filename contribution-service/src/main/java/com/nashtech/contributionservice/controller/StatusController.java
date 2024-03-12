package com.nashtech.contributionservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.slf4j.Slf4j;
@RestController
@RequestMapping("/")
@Slf4j
public class StatusController {

    @GetMapping
    public String appRunning(){

        log.info("-------------------appRunningContextPath");
        return "Contribution Service is Running...at root path";
    }

    @GetMapping
    @RequestMapping("cs")
    public String appRunningContextPath(){
        log.info("-------------------appRunningContextPath");
        return "Contribution Service is Running...at context path";
    }
}
