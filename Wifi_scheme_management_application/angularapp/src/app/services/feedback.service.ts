import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';
import { APP_URL } from '../app.constants';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService { 

  // public apiUrl = `http://localhost:8080/api/feedback`;


  constructor(private readonly http: HttpClient) {}

  sendFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${APP_URL+"/feedback"}`, feedback);
  }

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(APP_URL+"/feedback");
  }

  getAllFeedbacksByUserId(userId: number): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${APP_URL+"/feedback"}/user/${userId}`);
  }

  deleteFeedback(id: number): Observable<void> {
    return this.http.delete<void>(`${APP_URL+"/feedback"}/${id}`);
  }
}