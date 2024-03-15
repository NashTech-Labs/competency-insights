package com.nashtech.contributionservice.controller;

import com.nashtech.contributionservice.entity.OKRDataEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
class OKRController {

    // Ensure that only users with 'APPROLE_competency_insights_user' authority can access this method
    @PreAuthorize("hasAuthority('APPROLE_competency_insights_user')")
    @PostMapping("/addokr")
    public ResponseEntity<OKRDataEntity> addOKR(@RequestBody OKRDataEntity okrData) {
        // Process the received OKR data, you can print it for testing
        System.out.println("Received OKR Data:");
        System.out.println("Employee ID: " + okrData.getEmployeeId());
        System.out.println("Activity: " + okrData.getActivity());
        System.out.println("Radar Technology: " + okrData.getRadarTechnology());
        System.out.println("Title: " + okrData.getTitle());
        System.out.println("Due Date: " + okrData.getDueDate());
        System.out.println("Description: " + okrData.getDescription());

        // Return a response indicating success
        return ResponseEntity.status(HttpStatus.CREATED).body(okrData);
    }
}
