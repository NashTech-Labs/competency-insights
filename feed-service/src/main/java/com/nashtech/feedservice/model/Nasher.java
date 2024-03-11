package com.nashtech.feedservice.model;

import com.google.cloud.firestore.annotation.DocumentId;
import com.google.cloud.spring.data.firestore.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collectionName = "nashers")
public class Nasher {
    @DocumentId
    private String empId;
    private String name;
    private String email;
    private String designation;
    private String reportingManager;
    private String githubUsername;
}

