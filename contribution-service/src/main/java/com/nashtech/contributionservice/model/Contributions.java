package com.nashtech.contributionservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Contributions {
    private List<Blog> blogs;
    private List<Techhub> techHubs;
    private List<Knolx> knolx;
    private List<Certification> certifications;
}
