package com.nashtech.contributionservice.service;

import com.nashtech.contributionservice.entity.Nasher;
import com.nashtech.contributionservice.entity.OKRDataEntity;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface Processor {
     void saveNasher(Nasher info);
    Mono<Nasher> getNasherInfo(String empId);
    Mono<Nasher> getNasherByEmail(String email);
     Flux<Nasher> getNashers();
    void saveOKRData(OKRDataEntity okrData, String emailId, String name);
    List<OKRDataEntity> getOKRData();
    void deleteAllOKRData();
    List<OKRDataEntity> getOKRDataByEmail(String email);
    void updateOKRData(String emailId, String activity, String title, OKRDataEntity updatedData);
}
