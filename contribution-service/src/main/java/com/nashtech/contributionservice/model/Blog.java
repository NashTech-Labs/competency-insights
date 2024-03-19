package com.nashtech.contributionservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Blog {
    private String title;
    private String link;
    private String radarTechnology;
    private String dueDate;
    private String submissionDate;
    private String comments;
    private List<String> status;
}
