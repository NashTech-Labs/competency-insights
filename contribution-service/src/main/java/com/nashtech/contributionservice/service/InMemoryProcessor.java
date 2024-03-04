package com.nashtech.contributionservice.service;

import com.nashtech.contributionservice.entity.Nasher;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import java.util.HashMap;


@Profile("local")
@Service
public class InMemoryProcessor implements Processor {
    private final HashMap<String, Nasher> inMemoryData = new HashMap<>();

    @Override
    public void saveNasher(Nasher info) {
        inMemoryData.put(info.getEmpId(),info);
    }

    @Override
    public Mono<Nasher> getNasherInfo(String empId) {
       return Mono.just(inMemoryData.get(empId));
    }

    @Override
    public Flux<Nasher> getNashers() {
        return Flux.fromStream(inMemoryData.values().stream());
    }
}
