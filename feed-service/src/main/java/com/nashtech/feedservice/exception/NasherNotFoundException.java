package com.nashtech.feedservice.exception;

public class NasherNotFoundException extends RuntimeException {

    public NasherNotFoundException(String message) {
        super(message);
    }
}