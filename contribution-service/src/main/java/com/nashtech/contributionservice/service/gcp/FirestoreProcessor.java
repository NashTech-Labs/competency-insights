package com.nashtech.contributionservice.service.gcp;


import com.nashtech.contributionservice.entity.Nasher;
import com.nashtech.contributionservice.entity.OKRDataEntity;
import com.nashtech.contributionservice.repo.FirestoreRepository;
import com.nashtech.contributionservice.service.FirestoreService;
import com.nashtech.contributionservice.service.Processor;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.concurrent.ExecutionException;


@Service
@Profile("gcp")
public class FirestoreProcessor implements Processor {

    private final FirestoreRepository firestoreRepository;
    private FirestoreService firestoreService;

    public FirestoreProcessor(FirestoreRepository firestoreRepository) {
        this.firestoreRepository = firestoreRepository;
    }

    @Autowired(required = false)
    public void setFirestoreService(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

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
        return firestoreRepository.findByEmail(email);
    }
    @Override
    public Flux<Nasher> getNashers() {
        return firestoreRepository.findAll();
    }

    @Override
    public void saveOKRData(OKRDataEntity okrData, String emailId, String name) {
        try {
            firestoreService.saveOKRData(okrData, emailId, name);
        } catch (ExecutionException | InterruptedException e) {
        }
    }

    @Override
    public List<OKRDataEntity> getOKRData() {
        try {
            return firestoreService.getOKRData();
        } catch (ExecutionException | InterruptedException e) {
            return null;
        }
    }

    @Override
    public void deleteAllOKRData() {
        try {
            firestoreService.deleteAllOKRData();
        } catch (ExecutionException | InterruptedException e) {
        }
    }

    @Override
    public List<OKRDataEntity> getOKRDataByEmail(String email) {
        try {
            return firestoreService.getOKRDataByEmail(email);
        } catch (ExecutionException | InterruptedException e) {
            return null;
        }
    }

    @Override
    public void updateOKRData(String emailId, String activity, String title, OKRDataEntity updatedData) {
        try {
            firestoreService.updateOKRData(emailId, activity, title, updatedData);
        } catch (ExecutionException | InterruptedException e) {
        }
    }
}
