package com.nashtech.feedservice.service;

import com.nashtech.feedservice.helper.ExcelHelper;
import com.nashtech.feedservice.model.Nasher;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class ExcelService {

  private final FirestoreService firestoreService;
  private final PubSubService pubSubService;
  public void save(MultipartFile file) {
    try {
      List<Nasher> nasher = ExcelHelper.processExcelFile(file.getInputStream());
      //TODO: save in repo or send into topic
      log.info("List of Nashers: "+nasher);
      pubSubService.publishMessage(nasher);
      firestoreService.saveNasher(nasher);
    } catch (Exception e) {
      log.error("fail to store excel data: {} ", e.getMessage());
      throw new RuntimeException("fail to store excel data: " + e.getMessage());
    }
  }

  public ByteArrayInputStream load() {
    //TODO: TBD
    List<Nasher> nashers = List.of(new Nasher("Empid","name","email","designation","reportingManager","githubUsername"));
    ByteArrayInputStream in = ExcelHelper.nashersToExcel(nashers);
    return in;
  }

  public List<Nasher> getAllNashers() {
    //TODO: TBD
    List<Nasher> nashers = List.of(new Nasher("Empid","name","email","designation","reportingManager","githubUsername"));
    return nashers;
  }
}