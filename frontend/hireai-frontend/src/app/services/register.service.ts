import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  company?: string;
  role: 'CANDIDATE' | 'RECRUITER';
}

export interface RegisterResponse {
  message: string;
}

export interface OtpVerificationResponse {
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private readonly authUrl = `${environment.apiUrl}/api/auth`;

  constructor(private readonly http: HttpClient) { }

  register(payload: RegisterPayload): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.authUrl}/register`, payload);
  }

  verifyOtp(email: string, otp: string): Observable<OtpVerificationResponse> {
    return this.http.post<OtpVerificationResponse>(
      `${this.authUrl}/verify-otp`,
      { email, otp },
    );
  }
}
