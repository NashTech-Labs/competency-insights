package com.nashtech.contributionservice.service;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("local")
public class PasGo1ServiceInMemory implements PasGo1Service{
    @Override
    public void callPassService() {

    }

    @Override
    public void callGo1Service() {

    }

    @Override
    public void fileLoadService() {

    }
}
