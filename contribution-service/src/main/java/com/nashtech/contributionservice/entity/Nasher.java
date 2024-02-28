package com.nashtech.contributionservice.entity;


import com.google.cloud.firestore.annotation.DocumentId;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import com.google.cloud.spring.data.firestore.Document;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Document(collectionName = "nashers")
public class Nasher {
    @DocumentId
    private String empId;
    private String name;
    private String email;
    private String designation;
    private String lineManager;
    private String githubUsername;
}

