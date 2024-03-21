package com.nashtech.feedservice.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;

import com.nashtech.feedservice.service.GCPExcelService;

import java.io.InputStream;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.multipart.MultipartFile;

@ContextConfiguration(classes = {FeedController.class})
@ExtendWith(SpringExtension.class)
class FeedControllerTest {
    @Autowired
    private FeedController feedController;

    @MockBean
    private GCPExcelService GCPExcelService;

    /**
     * Method under test: {@link FeedController#uploadFile(MultipartFile)}
     */
    @Test
    void testUploadFile() throws Exception {
        // Arrange
        MockHttpServletRequestBuilder postResult = MockMvcRequestBuilders.post("/feed/upload");
        MockHttpServletRequestBuilder requestBuilder = postResult.param("file",
                String.valueOf(new MockMultipartFile("Name", (InputStream) null)));

        // Act
        ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(feedController)
                .build()
                .perform(requestBuilder);

        // Assert
        actualPerformResult.andExpect(MockMvcResultMatchers.status().is(415));
    }


}
