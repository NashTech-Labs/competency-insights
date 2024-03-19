package com.nashtech.contributionservice.repo;

import com.google.cloud.spring.data.firestore.FirestoreReactiveRepository;
import com.nashtech.contributionservice.entity.Nasher;
import org.springframework.context.annotation.Profile;
import reactor.core.publisher.Mono;

@Profile("gcp")
public interface FirestoreRepository extends FirestoreReactiveRepository<Nasher> {
        Mono<Nasher> findByEmpId(String empId);
        Mono<Nasher> findByEmail(String email);
}