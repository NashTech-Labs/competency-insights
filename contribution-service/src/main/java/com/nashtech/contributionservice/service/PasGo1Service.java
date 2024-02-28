package com.nashtech.contributionservice.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * This service will communicate to either the PAS service or the GO1% service to get basic information about Nashers.
 */
@Service
@Slf4j
public class PasGo1Service {
    private final PubSubService pubSubService;

    public PasGo1Service(PubSubService pubSubService) {
        this.pubSubService = pubSubService;
    }


    public void callPassService(){
        log.info("Request generated for Pas service");
        //TODO: integrate pas service here
        pubSubService.publishMessage(null);
    }

    public void callGo1Service(){
        log.info("Request generated for GO1% service");
        //TODO: integrate Go1% service here
        pubSubService.publishMessage(null);
    }

    public void fileLoadService(){
        log.info("Request generated for GO1% service");
        //TODO: integrate Go1% service here
        pubSubService.publishMessage(null);
    }


}
