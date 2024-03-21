package com.nashtech.feedservice.service;

import com.nashtech.feedservice.helper.ExcelHelper;
import com.nashtech.feedservice.model.Nasher;
import com.nashtech.feedservice.repo.FirestoreRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
@Profile("gcp")
public class GCPFeedService implements FeedService {

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
    List<Nasher> nashers = List.of(new Nasher("42",
            "Name",
            "jane.doe@example.org",
            "Date of Birth",
            "Date of Joining",
            "Designation",
            "Reporting Manager",
            "Department",
            "Location",
            "Contact",
            List.of("Reporting Member 1", "Reporting Member 2")));
    return ExcelHelper.nashersToExcel(nashers);
  }

  @Override
  public void saveNasher(Nasher info) {
    firestoreRepository.save(info).doOnError(Throwable::printStackTrace).subscribe();
  }

}