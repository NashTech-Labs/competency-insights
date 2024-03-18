package com.nashtech.contributionservice.entity;


import com.google.cloud.firestore.annotation.DocumentId;
import com.nashtech.contributionservice.model.Contributions;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import com.google.cloud.spring.data.firestore.Document;

import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Document(collectionName = "nashers")
public class Nasher {
    @DocumentId
    private String empId;
    private String name;
    private String email;
    private String dateOfBirth;
    private String dateOfJoining;
    private String designation;
    private String reportingManager;
    private String department;
    private List<String> reportingMembers;
    private Contributions contributions;
}

