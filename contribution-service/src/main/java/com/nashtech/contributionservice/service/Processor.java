package com.nashtech.contributionservice.service;

import com.nashtech.contributionservice.entity.Nasher;

import java.util.List;

public interface Processor {
     void saveNasher(Nasher info);
    Nasher getNasherInfo(String empId);
     List<Nasher> getNashers();
}
