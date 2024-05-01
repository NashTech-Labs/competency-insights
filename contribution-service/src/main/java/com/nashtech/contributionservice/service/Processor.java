package com.nashtech.contributionservice.service;

import com.nashtech.contributionservice.entity.Nasher;
import com.nashtech.contributionservice.entity.OKRDataEntity;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface Processor {
    void saveNasher(Nasher info);

    Mono<Nasher> getNasherInfo(String empId);

    Mono<Nasher> getNasherByEmail(String email);

    Flux<Nasher> getNashers();

    void saveOKRData(OKRDataEntity okrData, String emailId, String name, String competency) throws ExecutionException, InterruptedException;

    List<OKRDataEntity> getOKRData() throws ExecutionException, InterruptedException;

    void deleteAllOKRData() throws ExecutionException, InterruptedException;

    List<OKRDataEntity> getOKRDataByEmail(String email) throws ExecutionException, InterruptedException;

    void updateOKRData(String emailId, String activity, String title, OKRDataEntity updatedData) throws ExecutionException, InterruptedException;

    List<OKRDataEntity> getOKRByCompetency(String competency) throws ExecutionException, InterruptedException;
}
