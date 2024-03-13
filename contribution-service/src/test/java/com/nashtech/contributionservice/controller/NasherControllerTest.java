package com.nashtech.contributionservice.controller;

import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nashtech.contributionservice.entity.Nasher;
import com.nashtech.contributionservice.repo.FirestoreRepository;
import com.nashtech.contributionservice.service.PasGo1Service;
import com.nashtech.contributionservice.service.PasGo1ServiceInMemory;
import com.nashtech.contributionservice.service.Processor;
import com.nashtech.contributionservice.service.gcp.FirestoreProcessor;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@ContextConfiguration(classes = {NasherController.class})
@ExtendWith(SpringExtension.class)
class NasherControllerTest {
    @Autowired
    private NasherController nasherController;

    @MockBean
    private PasGo1Service pasGo1Service;

    @MockBean
    private Processor processor;

    /**
     * Method under test: {@link NasherController#getAllNasher()}
     */
    @Test
    void testGetAllNasher() {
        // Arrange
        FirestoreRepository firestoreRepository = mock(FirestoreRepository.class);
        Flux<Nasher> fromIterableResult = Flux.fromIterable(new ArrayList<>());
        when(firestoreRepository.findAll()).thenReturn(fromIterableResult);
        FirestoreProcessor processor = new FirestoreProcessor(firestoreRepository);

        // Act
        Flux<Nasher> actualAllNasher = (new NasherController(processor, new PasGo1ServiceInMemory())).getAllNasher();

        // Assert
        verify(firestoreRepository).findAll();
        assertSame(fromIterableResult, actualAllNasher);
    }

    /**
     * Method under test: {@link NasherController#getNasherById(String)}
     */
    @Test
    void testGetNasherById() {
        // Arrange
        FirestoreRepository firestoreRepository = mock(FirestoreRepository.class);
        Mono<Nasher> justResult = Mono
                .just(new Nasher("42", "Name", "jane.doe@example.org", "Designation", "Line Manager", "janedoe"));
        when(firestoreRepository.findByEmpId(Mockito.<String>any())).thenReturn(justResult);
        FirestoreProcessor processor = new FirestoreProcessor(firestoreRepository);

        // Act
        Mono<Nasher> actualNasherById = (new NasherController(processor, new PasGo1ServiceInMemory())).getNasherById("42");

        // Assert
        verify(firestoreRepository).findByEmpId(Mockito.<String>any());
        assertSame(justResult, actualNasherById);
    }

    /**
     * Method under test: {@link NasherController#saveNasher(Nasher)}
     */
    @Test
    void testSaveNasher() throws Exception {
        // Arrange
        doNothing().when(processor).saveNasher(Mockito.<Nasher>any());
        MockHttpServletRequestBuilder contentTypeResult = MockMvcRequestBuilders.post("/cs/nasher/save")
                .contentType(MediaType.APPLICATION_JSON);

        ObjectMapper objectMapper = new ObjectMapper();
        MockHttpServletRequestBuilder requestBuilder = contentTypeResult
                .content(objectMapper.writeValueAsString(new Nasher()));

        // Act and Assert
        MockMvcBuilders.standaloneSetup(nasherController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    /**
     * Method under test: {@link NasherController#triggerGo1Service()}
     */
    @Test
    void testTriggerGo1Service() throws Exception {
        // Arrange
        doNothing().when(pasGo1Service).callGo1Service();
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/cs/trigger/go1");

        // Act and Assert
        MockMvcBuilders.standaloneSetup(nasherController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("text/plain;charset=ISO-8859-1"))
                .andExpect(MockMvcResultMatchers.content().string("Successfully triggered Go1% service"));
    }

    /**
     * Method under test: {@link NasherController#triggerGo1Service()}
     */
    @Test
    void testTriggerGo1Service2() throws Exception {
        // Arrange
        doNothing().when(pasGo1Service).callGo1Service();
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/cs/trigger/go1");
        requestBuilder.contentType("https://example.org/example");

        // Act and Assert
        MockMvcBuilders.standaloneSetup(nasherController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("text/plain;charset=ISO-8859-1"))
                .andExpect(MockMvcResultMatchers.content().string("Successfully triggered Go1% service"));
    }

    /**
     * Method under test: {@link NasherController#triggerPasService()}
     */
    @Test
    void testTriggerPasService() throws Exception {
        // Arrange
        doNothing().when(pasGo1Service).callPassService();
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/cs/trigger/pas");

        // Act and Assert
        MockMvcBuilders.standaloneSetup(nasherController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("text/plain;charset=ISO-8859-1"))
                .andExpect(MockMvcResultMatchers.content().string("Successfully triggered Pas service"));
    }

    /**
     * Method under test: {@link NasherController#triggerPasService()}
     */
    @Test
    void testTriggerPasService2() throws Exception {
        // Arrange
        doNothing().when(pasGo1Service).callPassService();
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/cs/trigger/pas");
        requestBuilder.contentType("https://example.org/example");

        // Act and Assert
        MockMvcBuilders.standaloneSetup(nasherController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("text/plain;charset=ISO-8859-1"))
                .andExpect(MockMvcResultMatchers.content().string("Successfully triggered Pas service"));
    }
}
