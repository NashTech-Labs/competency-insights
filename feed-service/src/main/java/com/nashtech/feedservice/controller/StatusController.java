package com.nashtech.feedservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/feed")
public class StatusController {

    @GetMapping
    public String appRunning(){
        return "Feed Service is Running...";
    }
}
