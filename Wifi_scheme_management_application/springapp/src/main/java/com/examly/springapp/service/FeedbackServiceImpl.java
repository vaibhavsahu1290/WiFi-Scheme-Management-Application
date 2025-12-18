package com.examly.springapp.service;

import com.examly.springapp.exceptions.BadRequestException;
import com.examly.springapp.model.Feedback;
import com.examly.springapp.repository.FeedbackRepo;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepo feedbackRepo;


    public FeedbackServiceImpl(FeedbackRepo feedbackRepo) {
        this.feedbackRepo = feedbackRepo;

    }

    @Override
    public Feedback createFeedback(Feedback feedback) {
        if (!"Service".equalsIgnoreCase(feedback.getCategory()) &&
            !"Pricing".equalsIgnoreCase(feedback.getCategory())) {
            throw new BadRequestException("Invalid feedback category");
        }

        return feedbackRepo.save(feedback);
    }

    @Override
    public Feedback getFeedbackById(Long feedbackId) {
        return feedbackRepo.findById(feedbackId).orElse(null);
    }

    @Override
    public List<Feedback> getAllFeedbacks() {
        return feedbackRepo.findAll();
    }

    @Override
    public void deleteFeedback(Long feedbackId) {
        feedbackRepo.deleteById(feedbackId);
    }

    @Override
    public List<Feedback> getFeedbacksByUserId(Long userId) {
        return feedbackRepo.findByUserUserId(userId);

    }
}