package com.nashtech.contributionservice.service.gcp;


import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.nashtech.contributionservice.entity.Nasher;
import com.nashtech.contributionservice.entity.OKRDataEntity;
import com.nashtech.contributionservice.repo.FirestoreRepository;
import com.nashtech.contributionservice.service.Processor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;


@Service
@Profile("gcp")
public class FirestoreProcessor implements Processor {

    private final FirestoreRepository firestoreRepository;
    private Firestore firestore;

    @Autowired
    public void FirestoreService(Firestore firestore) {
        this.firestore = firestore;
    }

    public FirestoreProcessor(FirestoreRepository firestoreRepository) {
        this.firestoreRepository = firestoreRepository;
    }

    @Override
    public void saveNasher(Nasher info) {
        firestoreRepository.save(info);
    }

    @Override
    public Nasher getNasherInfo(String empId) {
        return firestoreRepository.findByEmpId(empId);
    }

    @Override
    public Nasher getNasherByEmail(String email) {
        return firestoreRepository.findByEmail(email);
    }

    @Override
    public List<Nasher> getNashers() {
        return firestoreRepository.findAll();
    }


    @Override
    public void saveOKRData(OKRDataEntity okrData, String emailId, String name, String competency) {
        okrData.setEmailId(emailId);
        okrData.setName(name);
        okrData.setCompetency(competency);
        CollectionReference okrCollection = firestore.collection("okrData");
        okrCollection.add(okrData);
    }

    @Override
    public List<OKRDataEntity> getOKRData() throws ExecutionException, InterruptedException {
        CollectionReference okrCollection = firestore.collection("okrData");
        ApiFuture<QuerySnapshot> querySnapshot = okrCollection.get();
        List<OKRDataEntity> okrDataList = new ArrayList<>();
        for (DocumentSnapshot document : querySnapshot.get().getDocuments()) {
            OKRDataEntity okrData = document.toObject(OKRDataEntity.class);
            okrDataList.add(okrData);
        }
        return okrDataList;
    }

    @Override
    public void deleteAllOKRData() throws ExecutionException, InterruptedException {
        CollectionReference okrCollection = firestore.collection("okrData");
        ApiFuture<QuerySnapshot> querySnapshot = okrCollection.get();
        for (DocumentSnapshot document : querySnapshot.get().getDocuments()) {
            document.getReference().delete();
        }
    }

    @Override
    public List<OKRDataEntity> getOKRDataByEmail(String email) throws ExecutionException, InterruptedException {
        List<OKRDataEntity> okrDataList = new ArrayList<>();

        CollectionReference okrDataCollection = firestore.collection("okrData");

        ApiFuture<QuerySnapshot> future = okrDataCollection.whereEqualTo("emailId", email).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();

        for (QueryDocumentSnapshot document : documents) {
            OKRDataEntity okrData = document.toObject(OKRDataEntity.class);
            okrDataList.add(okrData);
        }
        return okrDataList;
    }

    @Override
    public List<OKRDataEntity> getOKRByCompetency(String competency) throws ExecutionException, InterruptedException {
        List<OKRDataEntity> okrDataEntities = new ArrayList<>();

        CollectionReference collectionReference = firestore.collection("okrData");
        ApiFuture<QuerySnapshot> apiFuture = collectionReference.whereEqualTo("competency", competency).get();
        List<QueryDocumentSnapshot> documentSnapshots = apiFuture.get().getDocuments();

        for (QueryDocumentSnapshot document : documentSnapshots) {
            OKRDataEntity okrData = document.toObject(OKRDataEntity.class);
            okrDataEntities.add(okrData);
        }
        return okrDataEntities;
    }

    @Override
    public void updateOKRData(String emailId, String activity, String title, OKRDataEntity updatedData) throws ExecutionException, InterruptedException {
        CollectionReference okrCollection = firestore.collection("okrData");
        Query query = okrCollection.whereEqualTo("emailId", emailId).whereEqualTo("activity", activity).whereEqualTo("title", title);
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        for (DocumentSnapshot document : querySnapshot.get().getDocuments()) {
            Map<String, Object> updates = new HashMap<>();

            // Update specific fields
            updates.put("dueDate", updatedData.getDueDate());
            updates.put("submissionDate", updatedData.getSubmissionDate());
            updates.put("link", updatedData.getLink());
            updates.put("status", updatedData.getStatus());
            updates.put("description", updatedData.getDescription());

            document.getReference().update(updates); // Use update instead of set
        }
    }

}