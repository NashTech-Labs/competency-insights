<<<<<<<< HEAD:contribution-service/src/main/java/com/nashtech/contributionservice/controller/StatusController.java
package com.nashtech.contributionservice.controller;
========
package com.nashtech.feedservice.controller;
>>>>>>>> e0d468c54bbeb42f2d992902b5032c2fb989d5c4:feed-service/src/main/java/com/nashtech/feedservice/controller/StatusController.java

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
