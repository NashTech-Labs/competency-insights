package com.nashtech.contributionservice.controller;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class StatusController {

    private static final Log LOGGER = LogFactory.getLog(StatusController.class);
    @GetMapping
    public String appRunning(){

        LOGGER.info("-------------------appRunning  Root Path");
        return "Contribution Service is Running...at root path";
    }

    @GetMapping
    @RequestMapping("/cs/context")
    public String appRunningContextPath(){
        LOGGER.info("-------------------appRunning  ContextPath");
        return "Contribution Service is Running...at context path";
    }

    @GetMapping("/cs/swagger-ui.html")
    public RedirectView redirectToSwaggerUi() {
        LOGGER.info("-------------------redirecting to swagger");
        return new RedirectView("/swagger-ui/index.html");
    }

}
