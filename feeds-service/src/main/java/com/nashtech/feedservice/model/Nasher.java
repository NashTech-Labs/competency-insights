package com.nashtech.feedservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Nasher {
    private String empId;
    private String name;
    private String email;
    private String designation;
    private String reportingManager;
    private String githubUsername;
}

