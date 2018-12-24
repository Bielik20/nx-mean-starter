import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, Login, Register } from '@nx-mean-starter/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(model: Login): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('api/auth/login', model);
  }

  register(model: Register): Observable<AuthResponse> {
    return this.http.post<AuthResponse>('api/auth/register', model);
  }
}
