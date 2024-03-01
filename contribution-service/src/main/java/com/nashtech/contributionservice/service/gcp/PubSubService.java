package com.nashtech.contributionservice.service.gcp;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.cloud.pubsub.v1.Publisher;
import com.google.protobuf.ByteString;
import com.google.pubsub.v1.PubsubMessage;
import com.nashtech.contributionservice.entity.Nasher;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Profile("gcp")
@Service
@Slf4j
public class PubSubService {

    private final Publisher publisher;
    private final ObjectMapper mapper;

    public PubSubService(Publisher publisher, ObjectMapper mapper) {
        this.mapper = mapper;
        this.publisher = publisher;
    }
    public void publishMessage(Nasher info) {
        String data;
        try {
            data = mapper.writeValueAsString(info);
        } catch (JsonProcessingException e) {
            log.error("Unable to parse Nasher data {} ", info.getEmpId());
            throw new RuntimeException(e);
        }
        PubsubMessage pubsubMessage = PubsubMessage.newBuilder()
                    .setData(ByteString.copyFrom(data.getBytes()))
                    .build();
            publisher.publish(pubsubMessage);
        log.info("Message published: " + data);
        }
}