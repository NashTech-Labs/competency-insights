package com.nashtech.contributionservice.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.slf4j.Slf4j;
@RestController
@RequestMapping("/")
public class StatusController {

    private static final Log LOGGER = LogFactory.getLog(StatusController.class);
    @GetMapping
    public String appRunning(){

        LOGGER.info("-------------------appRunningContextPath");
        return "Contribution Service is Running...at root path";
    }

    @GetMapping
    @RequestMapping("cs")
    public String appRunningContextPath(){
        LOGGER.info("-------------------appRunningContextPath");
        return "Contribution Service is Running...at context path";
    }
}
