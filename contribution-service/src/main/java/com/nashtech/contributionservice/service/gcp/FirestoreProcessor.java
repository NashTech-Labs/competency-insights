package com.nashtech.contributionservice.service.gcp;


import com.nashtech.contributionservice.entity.Nasher;
import com.nashtech.contributionservice.repo.FirestoreRepository;
import com.nashtech.contributionservice.service.Processor;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


@Service
@Profile("gcp")
@AllArgsConstructor
public class FirestoreProcessor implements Processor {

    private final FirestoreRepository firestoreRepository;

    @Override
    public void saveNasher(Nasher info) {
        firestoreRepository.save(info).doOnError(Throwable::printStackTrace).subscribe();
    }

    @Override
    public Mono<Nasher> getNasherInfo(String empId) {
        return firestoreRepository.findByEmpId(empId);
    }

    @Override
    public Mono<Nasher> getNasherByEmail(String email) {
        return firestoreRepository.findByEmailId(email);
    }
    @Override
    public Flux<Nasher> getNashers() {
        return firestoreRepository.findAll();
    }


}
