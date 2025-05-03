import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterModel } from '../models/register.model';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8082/payflow/api/v1/auth';

  constructor(private http: HttpClient) {}

  register(data: RegisterModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  activateAccount(activationCode: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/activate-account?token=${activationCode}`
    );
  }

  login(credential: LoginModel): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, credential);
  }
}
