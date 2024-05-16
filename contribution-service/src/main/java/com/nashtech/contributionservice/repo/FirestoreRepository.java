package com.nashtech.contributionservice.repo;

import com.google.cloud.spring.data.firestore.FirestoreReactiveRepository;
import com.nashtech.contributionservice.entity.Nasher;
import org.springframework.context.annotation.Profile;

import java.util.List;

@Profile("gcp")
public interface FirestoreRepository {
        Nasher findByEmpId(String empId);
        Nasher findByEmail(String email);
        List<Nasher> findAll();
        void save(Nasher info);
}
