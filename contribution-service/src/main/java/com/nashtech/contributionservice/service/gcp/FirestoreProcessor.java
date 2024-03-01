package com.nashtech.contributionservice.service.gcp;


import com.nashtech.contributionservice.entity.Nasher;
import com.nashtech.contributionservice.repo.FirestoreRepository;
import com.nashtech.contributionservice.service.Processor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@Profile("gcp")
public class FirestoreProcessor implements Processor {

    private final FirestoreRepository firestoreRepository;
    public FirestoreProcessor(FirestoreRepository firestoreRepository) {
        this.firestoreRepository = firestoreRepository;
    }

    @Override
    public void saveNasher(Nasher info) {
        firestoreRepository.save(info).doOnError(Throwable::printStackTrace).subscribe();
    }

    @Override
    public Nasher getNasherInfo(String empId) {
        return firestoreRepository.findByEmpId(empId).orElse(null);
    }

    @Override
    public List<Nasher> getNashers() {
        List<Nasher> nasherList = new ArrayList<>();
        firestoreRepository.findAll().collectList().subscribe(nasherList::addAll);
        return nasherList;
    }
}
