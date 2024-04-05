package com.nashtech.contributionservice.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.nashtech.contributionservice.entity.OKRDataEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class FirestoreService {

    private final Firestore firestore;

    @Autowired
    public FirestoreService(Firestore firestore) {
        this.firestore = firestore;
    }

    public String saveOKRData(OKRDataEntity okrData, String emailId, String name) throws ExecutionException, InterruptedException {
        okrData.setEmailId(emailId);
        okrData.setName(name);
        CollectionReference okrCollection = firestore.collection("okrData");
        okrCollection.add(okrData);

        return "OKR data saved successfully";
    }

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

    public void deleteAllOKRData() throws ExecutionException, InterruptedException {
        CollectionReference okrCollection = firestore.collection("okrData");
        ApiFuture<QuerySnapshot> querySnapshot = okrCollection.get();
        for (DocumentSnapshot document : querySnapshot.get().getDocuments()) {
            document.getReference().delete();
        }
    }
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
}
