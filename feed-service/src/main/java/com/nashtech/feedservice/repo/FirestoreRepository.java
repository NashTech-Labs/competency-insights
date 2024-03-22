package com.nashtech.feedservice.repo;

import com.google.cloud.spring.data.firestore.FirestoreReactiveRepository;
import com.nashtech.feedservice.model.Nasher;
import org.springframework.context.annotation.Profile;
import reactor.core.publisher.Mono;

@Profile("gcp")
public interface FirestoreRepository extends FirestoreReactiveRepository<Nasher> {
        Mono<Nasher> findByEmpId(String empId);
}