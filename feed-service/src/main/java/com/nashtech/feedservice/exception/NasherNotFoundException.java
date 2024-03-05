package com.nashtech.feedservice.exception;

public class NasherNotFoundException extends RuntimeException {

    public NasherNotFoundException(Integer empId) {
        super("Nasher not found with Employee ID: " + empId);
    }

}