package com.nashtech.contributionservice.repo;

import com.google.cloud.spring.data.firestore.FirestoreReactiveRepository;
import com.nashtech.contributionservice.entity.Nasher;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@Profile("gcp")
public interface FirestoreRepository extends FirestoreReactiveRepository<Nasher> {
        Optional<Nasher> findByEmpId(String empId);
}