package com.nashtech.feedservice.service;

import com.nashtech.feedservice.model.Nasher;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;


public interface ExcelService {
    void save(MultipartFile file);
    ByteArrayInputStream load();

    void saveNasher(Nasher info);

}