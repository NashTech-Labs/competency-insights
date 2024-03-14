package com.nashtech.contributionservice.service;

import com.nashtech.contributionservice.entity.Nasher;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface Processor {
     void saveNasher(Nasher info);
    Mono<Nasher> getNasherInfo(String empId);
    Mono<Nasher> getNasherByEmail(String email);
     Flux<Nasher> getNashers();
}
