import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WifiScheme } from '../models/wifi-scheme.model';
import { Observable } from 'rxjs';
import { APP_URL } from '../app.constants';

@Injectable({ providedIn: 'root' })
export class WifiSchemeService {


  // public apiUrl = `http://localhost:8080/api/wifiScheme`;



  constructor(private readonly http: HttpClient) {}

  getAllWiFiSchemes(): Observable<WifiScheme[]> {
    
    return this.http.get<WifiScheme[]>(APP_URL+"/wifiScheme");
  }

  getWiFiSchemeById(id: number): Observable<WifiScheme> {
    return this.http.get<WifiScheme>(`${APP_URL+"/wifiScheme"}/${id}`);
  }

  addWiFiScheme(scheme: WifiScheme): Observable<WifiScheme> {
    return this.http.post<WifiScheme>(APP_URL+"/wifiScheme", scheme);
  }

  updateWiFiScheme(id: number, scheme: WifiScheme): Observable<WifiScheme> {
    return this.http.put<WifiScheme>(`${APP_URL+"/wifiScheme"}/${id}`, scheme);
  }

  deleteWiFiScheme(id: number): Observable<void> {
    return this.http.delete<void>(APP_URL+"/wifiScheme/"+id);
  }
}