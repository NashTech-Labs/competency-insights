package com.nashtech.feedservice.repo;

import com.google.cloud.spring.data.firestore.FirestoreReactiveRepository;
import com.nashtech.feedservice.model.Nasher;
import reactor.core.publisher.Mono;

public interface FirestoreRepository extends FirestoreReactiveRepository<Nasher> {
        Mono<Nasher> findByEmpId(String empId);
}