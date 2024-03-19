package com.nashtech.contributionservice.service;

import com.nashtech.contributionservice.entity.Nasher;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import java.util.HashMap;


@Profile("local")
@Service
@Slf4j
public class InMemoryProcessor implements Processor {
    private final HashMap<String, Nasher> inMemoryData = new HashMap<>();

    @Override
    public void saveNasher(Nasher info) {
        log.info("Data saved in local [InMemory]");
        inMemoryData.put(info.getEmpId(),info);
    }

    @Override
    public Mono<Nasher> getNasherInfo(String empId) {
        log.info("Retrieving Nasher data from local [InMemory] by Employee Id: {}",empId);
       return Mono.just(inMemoryData.get(empId));
    }

    @Override
    public Mono<Nasher> getNasherByEmail(String email) {
        return Flux.fromIterable(inMemoryData.values())
                .filter(nasher -> email.equals(nasher.getEmail()))
                .next()
                .switchIfEmpty(Mono.error(new RuntimeException("Nasher not found for email: " + email)));
    }
    @Override
    public Flux<Nasher> getNashers() {
        log.info("Retrieving Nasher data from local [InMemory]");
        return Flux.fromStream(inMemoryData.values().stream());
    }
}
