import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Exemple GET
  getAll(endpoint: string) {
    return this.http.get(`${this.baseUrl}/${endpoint}`);
  }

  // Exemple POST
  post(endpoint: string, body: any) {
    return this.http.post(`${this.baseUrl}/${endpoint}`, body);
  }

  
}
