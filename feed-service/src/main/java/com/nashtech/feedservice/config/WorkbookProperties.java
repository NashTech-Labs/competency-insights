package com.nashtech.feedservice.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Component
@ConfigurationProperties(prefix = "workbook")
public class WorkbookProperties {

    private Set<String> headers = new HashSet<>();

    public Set<String> getHeaders() {
        return headers.stream().map(String::toLowerCase).collect(Collectors.toSet());
    }

    public void setHeaders(Set<String> headers) {
        this.headers = headers;
    }
}