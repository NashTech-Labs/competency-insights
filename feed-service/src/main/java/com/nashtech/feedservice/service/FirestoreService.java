package com.nashtech.feedservice.service;


import com.nashtech.feedservice.model.Nasher;
import com.nashtech.feedservice.repo.FirestoreRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;


@Service
@AllArgsConstructor
@Slf4j
public class FirestoreService {

    private final FirestoreRepository firestoreRepository;


    public void saveNasher(List<Nasher> info) {
        firestoreRepository.saveAll(info).doOnError(Throwable::printStackTrace).subscribe();
        log.info("Data sent to firestore: " + info);
    }


    public Mono<Nasher> getNasherInfo(String empId) {
        return firestoreRepository.findByEmpId(empId);
    }

    public Flux<Nasher> getNashers() {
        return firestoreRepository.findAll();
    }
}
