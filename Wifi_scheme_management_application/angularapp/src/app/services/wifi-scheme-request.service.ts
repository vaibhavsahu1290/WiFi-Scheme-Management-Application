import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WifiSchemeRequest } from '../models/wifi-scheme-request.model';
import { Observable } from 'rxjs';
import { APP_URL } from '../app.constants';

@Injectable({ providedIn: 'root' })
export class WifiSchemeRequestService {

  // public apiUrl=`http://localhost:8080/api/wifiSchemeRequest`;


  constructor(private readonly http: HttpClient) {}

  getAllWiFiSchemeRequests(): Observable<WifiSchemeRequest[]> {
    return this.http.get<WifiSchemeRequest[]>(APP_URL+"/wifiSchemeRequest");
  }

  getWiFiSchemeRequestsByUserId(userId: number): Observable<WifiSchemeRequest[]> {
    return this.http.get<WifiSchemeRequest[]>(`${APP_URL+"/wifiSchemeRequest"}/user/${userId}`);
  }

  addWiFiSchemeRequest(request: WifiSchemeRequest): Observable<WifiSchemeRequest> {
    console.log(request);
    
    return this.http.post<WifiSchemeRequest>(`${APP_URL+"/wifiSchemeRequest"}`, request);
  }

  updateWiFiSchemeRequest(id: number, request: WifiSchemeRequest): Observable<WifiSchemeRequest> {
    return this.http.put<WifiSchemeRequest>(`${APP_URL+"/wifiSchemeRequest"}/${id}`, request);
  }

  deleteWiFiSchemeRequest(id: number): Observable<any> {
    return this.http.delete<void>(`${APP_URL+"/wifiSchemeRequest"}/${id}`);
  }
}