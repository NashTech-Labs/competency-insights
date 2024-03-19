package com.nashtech.contributionservice.service.gcp;

import com.nashtech.contributionservice.entity.Nasher;
import com.nashtech.contributionservice.model.Contributions;
import com.nashtech.contributionservice.service.PasGo1Service;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * This service will communicate to either the PAS service or the GO1% service to get basic information about Nashers.
 */
@Service
@Slf4j
@Profile("gcp")
@AllArgsConstructor
public class PasGo1ServiceImpl implements PasGo1Service {
    private final PubSubService pubSubService;

    @Override
    public void callPassService(){
        log.info("Request generated for Pas service");
        //TODO: integrate pas service here
        List<Nasher> info = List.of(new Nasher("EMP001", "John Doe", "john@example.com", "1990-01-01",
                "2020-01-01", "Software Engineer", "ManagerX", "IT Department","Noida","9046789898",
                List.of("EmployeeA", "EmployeeB"),new Contributions()));
        pubSubService.publishMessage(info);
    }

    @Override
    public void callGo1Service(){
        log.info("Request generated for GO1% service");
        //TODO: integrate Go1% service here
        List<Nasher> info = List.of(new Nasher("EMP001", "John Doe", "john@example.com", "1990-01-01",
                "2020-01-01", "Software Engineer", "ManagerX", "IT Department","Noida","9046789898",
                List.of("EmployeeA", "EmployeeB"),new Contributions()));
        pubSubService.publishMessage(info);
    }

    @Override
    public void fileLoadService(){
        log.info("Request generated for GO1% service");
        //TODO: integrate Go1% service here
        List<Nasher> info = List.of(new Nasher("EMP001", "John Doe", "john@example.com", "1990-01-01",
                "2020-01-01", "Software Engineer", "ManagerX", "IT Department","Noida","9046789898",
                List.of("EmployeeA", "EmployeeB"),new Contributions()));
        pubSubService.publishMessage(info);
    }

}