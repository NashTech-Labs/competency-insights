package com.nashtech.contributionservice.entity;

import com.google.cloud.spring.data.firestore.Document;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document(collectionName = "okrData")
public class OKRDataEntity {

    private String emailId;
    private String activity;
    private String radarTechnology;
    private String title;
    private String dueDate;
    private String submissionDate;
    private String link;
    private String status;
    private String description;

}