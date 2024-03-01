package com.nashtech.feedservice.service;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

import com.nashtech.feedservice.helper.ExcelHelper;
import com.nashtech.feedservice.model.Nasher;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ExcelService {

  public void save(MultipartFile file) {
    try {
      List<Nasher> tutorials = ExcelHelper.excelToNashers(file.getInputStream());

    } catch (IOException e) {
      throw new RuntimeException("fail to store excel data: " + e.getMessage());
    }
  }

  public ByteArrayInputStream load() {
    List<Nasher> tutorials = null;

    ByteArrayInputStream in = ExcelHelper.nashersToExcel(tutorials);
    return in;
  }

  public List<Nasher> getAllTutorials() {
    return null;
  }
}