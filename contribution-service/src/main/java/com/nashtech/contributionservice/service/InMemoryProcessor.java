package com.nashtech.contributionservice.service;

import com.nashtech.contributionservice.entity.Nasher;
import com.nashtech.contributionservice.entity.OKRDataEntity;
import com.nashtech.contributionservice.exception.NasherNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.*;
import java.util.concurrent.ExecutionException;


@Profile("local")
@Service
@Slf4j
public class InMemoryProcessor implements Processor {
    private final WeakHashMap<String, Nasher> inMemoryData = new WeakHashMap<>();
    private final Map<String, List<OKRDataEntity>> inMemoryOKRData = new HashMap<>();

    @Override
    public void saveNasher(Nasher info) {
        log.info("Data saved in local [InMemory]");
        inMemoryData.put(info.getEmpId(),info);
    }

    @Override
    public Mono<Nasher> getNasherInfo(String empId) {
        log.info("Retrieving Nasher data from local [InMemory] by Employee Id: {}",empId);
        if (inMemoryData.get(empId) == null) {
            throw new NasherNotFoundException(empId);
        }
        return Mono.just(inMemoryData.get(empId));
    }

    @Override
    public Mono<Nasher> getNasherByEmail(String email) {
        return Flux.fromIterable(inMemoryData.values())
                .filter(nasher -> email.equals(nasher.getEmail()))
                .next()
                .switchIfEmpty(Mono.error(new NasherNotFoundException("Nasher not found for email: " + email)));
    }
    @Override
    public Flux<Nasher> getNashers() {
        log.info("Retrieving Nasher data from local [InMemory]");
        return Flux.fromStream(inMemoryData.values().stream());
    }

    @Override
    public void saveOKRData(OKRDataEntity okrData, String emailId, String name, String competency) throws ExecutionException, InterruptedException {
        List<OKRDataEntity> dataList = inMemoryOKRData.getOrDefault(emailId, new ArrayList<>());
        dataList.add(okrData);
        log.info("Data saved in local [InMemory]");
        inMemoryOKRData.put(emailId, dataList);
    }

    @Override
    public List<OKRDataEntity> getOKRData() {
        List<OKRDataEntity> result = new ArrayList<>();
        log.info("Retrieving OKR data from local [InMemory]");
        inMemoryOKRData.values().forEach(result::addAll);
        return result;
    }

    @Override
    public void deleteAllOKRData() {
        log.info("Deleting OKR data from local [InMemory]");
        inMemoryOKRData.clear();
    }

    @Override
    public List<OKRDataEntity> getOKRDataByEmail(String email) {
        log.info("Retrieving OKR data from local [InMemory] by emailId");
        return inMemoryOKRData.getOrDefault(email, new ArrayList<>());
    }

    @Override
    public List<OKRDataEntity> getOKRByCompetency(String competency) {
        log.info("Retrieving OKR data from local [InMemory] by competency: {}", competency);
        List<OKRDataEntity> okrDataEntities = new ArrayList<>();

        for (List<OKRDataEntity> dataList : inMemoryOKRData.values()) {
            for (OKRDataEntity okrDataEntity : dataList) {
                if (competency.equals(okrDataEntity.getCompetency())) {
                    okrDataEntities.add(okrDataEntity);
                }
            }
        }
        return okrDataEntities;
    }


    @Override
    public void updateOKRData(String emailId, String activity, String title, OKRDataEntity updatedData) {
        List<OKRDataEntity> dataList = inMemoryOKRData.getOrDefault(emailId, new ArrayList<>());
        dataList.stream()
                .filter(okrData -> okrData.getActivity().equals(activity) && okrData.getTitle().equals(title))
                .findFirst()
                .ifPresent(existingData -> {
                    existingData.setDueDate(updatedData.getDueDate());
                    existingData.setSubmissionDate(updatedData.getSubmissionDate());
                    existingData.setLink(updatedData.getLink());
                    existingData.setStatus(updatedData.getStatus());
                    existingData.setDescription(updatedData.getDescription());
                });
        log.info("Updating the data from local [InMemory]");
    }
}
