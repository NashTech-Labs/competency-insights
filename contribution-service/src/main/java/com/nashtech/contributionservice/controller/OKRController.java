package com.nashtech.contributionservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nashtech.contributionservice.entity.OKRDataEntity;
import com.nashtech.contributionservice.service.Processor;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/cs")
public class OKRController {

    private final Processor processor;

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
                if (dotIndex != -1 && dotIndex < emailId.length() - 1) {
                    emailId = Character.toUpperCase(emailId.charAt(0)) + emailId.substring(1, dotIndex + 1) +
                            Character.toUpperCase(emailId.charAt(dotIndex + 1)) + emailId.substring(dotIndex + 2);
                }
                okrData.setEmailId(emailId);
                okrData.setName(name);
                processor.saveOKRData(okrData, emailId, name);
                return ResponseEntity.status(HttpStatus.CREATED).body("OKR data saved successfully");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error saving data");
        }
    }

    @GetMapping("/nasher/okrdata")
    public ResponseEntity<List<OKRDataEntity>> getOKRData() {
        try {
            List<OKRDataEntity> okrDataList = processor.getOKRData();
            return ResponseEntity.ok(okrDataList);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/nasher/deleteokrdata")
    public ResponseEntity<String> deleteAllOKRData() {
        try {
            processor.deleteAllOKRData();
            return ResponseEntity.ok("All OKR data deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting OKR data");
        }
    }

    @Autowired
    private ObjectMapper objectMapper;

    @PreAuthorize("hasAuthority('APPROLE_competency_insights_user')")
    @GetMapping(value = "/nasher/okrdata/{email}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getOKRByEmail(@PathVariable String email) {
        try {
            List<OKRDataEntity> okrDataList = processor.getOKRDataByEmail(email);
            String res = objectMapper.writeValueAsString(okrDataList);
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving okr data");
        }
    }

    @PreAuthorize("hasAuthority('APPROLE_competency_insights_user')")
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
                String activity = updatedData.getActivity();
                String title = updatedData.getTitle();
                processor.updateOKRData(emailId, activity, title, updatedData);
                return ResponseEntity.ok("OKR data updated successfully");
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating OKR data");
        }
    }
}
