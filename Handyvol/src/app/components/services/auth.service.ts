//components/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SKIP_AUTH_INTERCEPTOR } from './auth.tokens';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8000/api/auth/';

  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getUserInfo(): Observable<any> {
    return this.http.get(`${this.baseUrl}status/`).pipe(
      catchError((error) => {
        console.error('Ошибка получения данных пользователя:', error);
        return throwError(() => new Error('Не удалось получить данные пользователя.'));
      })
    );
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}token/`, credentials, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      tap((response: any) => {
        if (response && response.access) {
          localStorage.setItem('authToken', response.access);

          if (response.refresh) {
            localStorage.setItem('refreshToken', response.refresh);
          }
        }
      }),
      catchError((error) => {
        console.error('Login error:', error);
        return throwError(() => error);
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

    console.log('Отправка данных регистрации:', payload);

    return this.http.post(`${this.baseUrl}register/`, payload, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      context: new HttpContext().set(SKIP_AUTH_INTERCEPTOR, true),
    }).pipe(
      catchError((error) => {
        console.error('Ошибка при регистрации:', {
          status: error.status,
          statusText: error.statusText,
          error: error.error,
          url: error.url,
        });
        return throwError(() => error);
      })
    );
  }

  logout(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post(`${this.baseUrl}logout/`, { refresh: refreshToken }).pipe(
      catchError((error) => {
        console.error('Ошибка при выходе из системы:', error);
        return throwError(() => error);
      })
    );
  }
}
