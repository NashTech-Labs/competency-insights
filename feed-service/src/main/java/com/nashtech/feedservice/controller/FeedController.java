package com.nashtech.feedservice.controller;

import com.nashtech.feedservice.controller.response.ResponseMessage;
import com.nashtech.feedservice.helper.ExcelHelper;
import com.nashtech.feedservice.model.Nasher;
import com.nashtech.feedservice.service.ExcelService;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/feed")
@Slf4j
@AllArgsConstructor
public class FeedController {

    private final ExcelService fileService;

    @PreAuthorize("hasAuthority('APPROLE_competency_insights_user')")
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
        log.info("Enter into ExcelController: File Upload request");
        String message;

        if (file.isEmpty()) {
            message = "You must select a file!";
            return new ResponseEntity<>(new ResponseMessage(message), HttpStatus.OK);
        }
        log.info("File name: {}", file.getOriginalFilename());
        if (ExcelHelper.hasExcelFormat(file)) {
            try {
                fileService.save(file);
                message = "Uploaded the file successfully: " + file.getOriginalFilename();
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
            } catch (Exception e) {
                message = "Could not upload the file: " + file.getOriginalFilename() + "!";
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
            }
        }

        message = "Please upload an excel file!";
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message));
    }

    @PreAuthorize("hasAuthority('APPROLE_competency_insights_admin')")
    @PostMapping("/nasher/save")
    public void saveNasher(@RequestBody Nasher nasher) {
        log.info("Enter into NasherController: Saving Nasher with Employee Id: " +  nasher.getEmpId());
        fileService.saveNasher(nasher);
    }

    //@GetMapping("/download")
    public ResponseEntity<Resource> getFile() {
        String filename = "Nashers.xlsx";
        InputStreamResource file = new InputStreamResource(fileService.load());

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .body(file);
    }

}