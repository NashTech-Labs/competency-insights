package com.nashtech.contributionservice.service;

import com.nashtech.contributionservice.entity.Nasher;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Profile("local")
@Service
public class InMemoryProcessor implements Processor {
    private final HashMap<String, Nasher> inMemoryData = new HashMap<>();

    @Override
    public void saveNasher(Nasher info) {
        inMemoryData.put(info.getEmpId(),info);
    }

    @Override
    public Nasher getNasherInfo(String empId) {
        return inMemoryData.get(empId);
    }

    @Override
    public List<Nasher> getNashers() {
        return inMemoryData.values().stream().toList();
    }
}
