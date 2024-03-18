<<<<<<<< HEAD:contribution-service/src/main/java/com/nashtech/contributionservice/controller/StatusController.java
package com.nashtech.contributionservice.controller;
========
package com.nashtech.feedservice.controller;
>>>>>>>> 06c2dc8883bd24eee9af8d1c0493b00805bd0668:feed-service/src/main/java/com/nashtech/feedservice/controller/StatusController.java

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
