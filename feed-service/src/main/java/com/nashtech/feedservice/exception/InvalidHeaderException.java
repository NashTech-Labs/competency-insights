package com.nashtech.feedservice.exception;

public class InvalidHeaderException extends RuntimeException{
    public InvalidHeaderException(String message){
        super(message);
    }
}
