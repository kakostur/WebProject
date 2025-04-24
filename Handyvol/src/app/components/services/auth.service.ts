//components/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api/auth/';

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    const payload = {
      username: credentials.email, 
      password: credentials.password,
    };

    return this.http.post(`${this.baseUrl}token/`, payload, {
      headers: { 'Content-Type': 'application/json' },
    }).pipe(
      catchError((error) => {
        console.error('Login error:', error.error);
        return throwError(() => new Error(error.error?.detail || 'Login failed'));
      })
    );
  }
  register(userData: { name: string; email: string; password: string; role: string }): Observable<any> {
    const payload = {
      username: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    };
  
    return this.http.post(`${this.baseUrl}register/`, payload, {
      headers: { 'Content-Type': 'application/json' },
    }).pipe(
      catchError((error) => {
        console.error('Registration error:', error.error);
        return throwError(() => error.error?.detail || 'Registration failed');
      })
    );
  }
  
}
