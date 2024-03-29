package com.nashtech.feedservice.service;


import com.nashtech.feedservice.helper.ExcelHelper;
import com.nashtech.feedservice.model.Nasher;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;
import java.util.WeakHashMap;


@Service
@Slf4j
@Profile("local")
public class InMemoryFeedService implements FeedService {
    private final WeakHashMap<String, Nasher> inMemoryData = new WeakHashMap<>();
    @Override
    public void save(MultipartFile file) {
        log.info("Data saved in local [InMemory]");
        try {
            List<Nasher> nashers = ExcelHelper.processExcelFile(file.getInputStream());
            nashers.forEach(nasher -> inMemoryData.put(nasher.getEmpId(),nasher));
        } catch (IOException e) {
            log.error("fail to store excel data: {} ", e.getMessage());
            throw new RuntimeException("fail to store excel data: " + e.getMessage());
        }
    }

    @Override
    public ByteArrayInputStream load() {
        return ExcelHelper.nashersToExcel(inMemoryData.values().stream().toList());
    }

    @Override
    public void saveNasher(Nasher info) {
        log.info("Data saved in local [InMemory]");
        inMemoryData.put(info.getEmpId(),info);
    }

}
