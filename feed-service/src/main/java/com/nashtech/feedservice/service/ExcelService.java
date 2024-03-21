package com.nashtech.feedservice.service;

import com.nashtech.feedservice.model.Nasher;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import java.io.ByteArrayInputStream;


public interface ExcelService {
    void save(MultipartFile file);
    ByteArrayInputStream load();

    Flux<Nasher> getAllNashers();

    Mono<Nasher> getNasherInfo(String empId);
}