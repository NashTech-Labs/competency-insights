package com.nashtech.feedservice.rest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatusController {

    @GetMapping
    public String appRunning(){
        return "Feed Service is Running...";
    }
}
