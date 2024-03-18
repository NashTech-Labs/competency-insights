package com.nashtech.contributionservice.config;


import com.google.cloud.pubsub.v1.Publisher;
import com.google.pubsub.v1.TopicName;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.io.IOException;

@Configuration
@Profile("gcp")
@Slf4j
public class GCPConfig {

    @Value("${spring.cloud.gcp.project-id}")
    private String projectId;

    @Value("${pubsub.topic-id}")
    private String topicId;

    @Bean
    public Publisher publisherBean() {
        try {
            return Publisher.newBuilder(TopicName.of(projectId, topicId)).build();
        } catch (IOException e) {
            log.error("Unable to create Pub-Sub publisher: ", e);
            throw new RuntimeException(e);
        }
    }
}
