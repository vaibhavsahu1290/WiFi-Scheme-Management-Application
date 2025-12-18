package com.examly.springapp.service;

import com.examly.springapp.model.Feedback;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface FeedbackService {
    Feedback createFeedback(Feedback feedback);
    Feedback getFeedbackById(Long feedbackId);
    List<Feedback> getAllFeedbacks();
    void deleteFeedback(Long feedbackId);
    List<Feedback> getFeedbacksByUserId(Long userId);

}
