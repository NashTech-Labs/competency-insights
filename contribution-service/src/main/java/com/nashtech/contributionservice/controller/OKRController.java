package com.nashtech.contributionservice.controller;

import com.nashtech.contributionservice.entity.OKRDataEntity;
import com.nashtech.contributionservice.service.FirestoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
class OKRController {

    private final FirestoreService firestoreService;

    @Autowired
    public OKRController(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    @PreAuthorize("hasAuthority('APPROLE_competency_insights_user')")
    @PostMapping("/addokr")
    public ResponseEntity<String> addOKR(@RequestBody OKRDataEntity okrData) {
        try {
            String updateTime = firestoreService.saveOKRData(okrData);
            return ResponseEntity.status(HttpStatus.CREATED).body("Data saved. Update time: " + updateTime);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving data to Firestore");
        }
    }

    @GetMapping("/okrdata")
    public ResponseEntity<Object> getOKRData() {
        try {
            List<OKRDataEntity> okrDataList = firestoreService.getOKRData();
            return ResponseEntity.ok(okrDataList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
