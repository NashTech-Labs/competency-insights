package com.nashtech.feedservice.service;

import com.nashtech.feedservice.helper.ExcelHelper;
import com.nashtech.feedservice.model.Nasher;
import com.nashtech.feedservice.repo.FirestoreRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.ByteArrayInputStream;
import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
@Profile("gcp")
public class GCPExcelService implements ExcelService {

  private final FirestoreRepository firestoreRepository;
  private final PubSubService pubSubService;
  @Override
  public void save(MultipartFile file) {
    log.info("Enter into GCPExcelService: File Upload request with File {}", file.getOriginalFilename());
    try {
      List<Nasher> nashers = ExcelHelper.processExcelFile(file.getInputStream());
      log.info("List of Nashers count: {}",nashers.size());
      pubSubService.publishMessage(nashers);
      firestoreRepository.saveAll(nashers).doOnError(Throwable::printStackTrace).subscribe();
    } catch (Exception e) {
      log.error("fail to store excel data: {} ", e.getMessage());
      throw new RuntimeException("fail to store excel data: " + e.getMessage());
    }
  }

  @Override
  public ByteArrayInputStream load() {
    //TODO: TBD
    List<Nasher> nashers = List.of(new Nasher("Empid","name","email","designation","reportingManager","githubUsername"));
    return ExcelHelper.nashersToExcel(nashers);
  }

  @Override
  public Flux<Nasher> getAllNashers() {
    log.info("Enter into GCPExcelService: Get all Nashers");
    return firestoreRepository.findAll();
  }

  @Override
  public Mono<Nasher> getNasherInfo(String empId) {
    log.info("Enter into GCPExcelService: Get Nasher by email");
    return firestoreRepository.findByEmpId(empId);
  }
}