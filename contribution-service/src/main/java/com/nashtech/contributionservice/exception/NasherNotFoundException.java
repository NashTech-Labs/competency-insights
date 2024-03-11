package com.nashtech.contributionservice.exception;

public class NasherNotFoundException extends RuntimeException {

    public NasherNotFoundException(Integer empId) {
        super("Nasher not found with Employee ID: " + empId);
    }

}