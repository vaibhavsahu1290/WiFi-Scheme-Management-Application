package com.examly.springapp.model;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
public class WiFiSchemeRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long wifiSchemeRequestId;

    @ManyToOne
    @JoinColumn(name = "userId", nullable = false)
    private User user;
 
    @ManyToOne
    @JoinColumn(name = "wifiSchemeId", nullable = false)
    private WiFiScheme wifiScheme;

    private LocalDate requestDate;

    private String status;

    private String comments;

    @Lob
    private String proof;

    private String streetName;

    private String landmark;

    private String city;

    private String state;

    private String zipCode;

    private LocalDate preferredSetupDate;

    private String timeSlot;
    
    public Long getWifiSchemeRequestId() {
        return wifiSchemeRequestId;
    }

    public void setWifiSchemeRequestId(Long wifiSchemeRequestId) {
        this.wifiSchemeRequestId = wifiSchemeRequestId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public WiFiScheme getWifiScheme() {
        return wifiScheme;
    }

    public void setWifiScheme(WiFiScheme wifiScheme) {
        this.wifiScheme = wifiScheme;
    }

    public LocalDate getRequestDate() {
        return requestDate;
    }

    public void setRequestDate(LocalDate requestDate) {
        this.requestDate = requestDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    public String getProof() {
        return proof;
    }

    public void setProof(String proof) {
        this.proof = proof;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getLandmark() {
        return landmark;
    }

    public void setLandmark(String landmark) {
        this.landmark = landmark;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public LocalDate getPreferredSetupDate() {
        return preferredSetupDate;
    }

    public void setPreferredSetupDate(LocalDate preferredSetupDate) {
        this.preferredSetupDate = preferredSetupDate;
    }

    public String getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }

}