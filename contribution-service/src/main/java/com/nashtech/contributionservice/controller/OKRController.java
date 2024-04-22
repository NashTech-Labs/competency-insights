package com.nashtech.contributionservice.controller;

import com.nashtech.contributionservice.entity.OKRDataEntity;
import com.nashtech.contributionservice.service.FirestoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/cs")
class OKRController {

    private final FirestoreService firestoreService;

    @Autowired
    public OKRController(FirestoreService firestoreService) {
        this.firestoreService = firestoreService;
    }

    @PreAuthorize("hasAuthority('APPROLE_competency_insights_user')")
    @PostMapping("/nasher/addokr")
    public ResponseEntity<String> addOKR(@RequestBody OKRDataEntity okrData) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof Jwt) {
                Jwt jwt = (Jwt) authentication.getPrincipal();
                String emailId = jwt.getClaim("email").toString();
                String name = jwt.getClaim("name").toString();
                int dotIndex = emailId.indexOf('.');
                if (dotIndex != -1 && dotIndex < emailId.length() - 1) { emailId = Character.toUpperCase(emailId.charAt(0))
                        + emailId.substring(1, dotIndex + 1) + Character.toUpperCase(emailId.charAt(dotIndex + 1)) +
                        emailId.substring(dotIndex + 2); }
                firestoreService.saveOKRData(okrData, emailId, name);

                return ResponseEntity.status(HttpStatus.CREATED).body("OKR data saved successfully");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving data to Firestore");
        }
    }

    @GetMapping("/nasher/okrdata")
    public ResponseEntity<Object> getOKRData() {
        try {
            List<OKRDataEntity> okrDataList = firestoreService.getOKRData();
            return ResponseEntity.ok(okrDataList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/nasher/deleteokrdata")
    public ResponseEntity<String> deleteAllOKRData() {
        try {
            firestoreService.deleteAllOKRData(); // Delete all OKR data from Firestore
            return ResponseEntity.ok("All OKR data deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting OKR data");
        }
    }

    @GetMapping("/nasher/okrdata/{email}")
    public ResponseEntity<Object> getOKRByEmail(@PathVariable String email) {
        try {
            List<OKRDataEntity> okrDataList = firestoreService.getOKRDataByEmail(email);
            return ResponseEntity.ok(okrDataList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving okr data");
        }
    }

    @PutMapping("/nasher/updateokr")
    public ResponseEntity<String> updateOKR(@RequestBody OKRDataEntity updatedData) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication != null && authentication.isAuthenticated() && authentication.getPrincipal() instanceof Jwt) {
                Jwt jwt = (Jwt) authentication.getPrincipal();
                String emailId = jwt.getClaim("email").toString();
                String name = jwt.getClaim("name").toString();
                int dotIndex = emailId.indexOf('.');
                if (dotIndex != -1 && dotIndex < emailId.length() - 1) {
                    emailId = Character.toUpperCase(emailId.charAt(0)) + emailId.substring(1, dotIndex + 1) +
                            Character.toUpperCase(emailId.charAt(dotIndex + 1)) + emailId.substring(dotIndex + 2);
                }

                // Capitalize email, then update
                String activity = updatedData.getActivity();
                String title = updatedData.getTitle();

                // Check if the email, activity, and title exist, then update
                firestoreService.updateOKRData(emailId, activity, title, updatedData);

                return ResponseEntity.ok("OKR data updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating OKR data");
        }
    }
}
