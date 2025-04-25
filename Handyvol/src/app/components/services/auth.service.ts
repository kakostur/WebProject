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

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken'); 
  }

  getUserInfo(): Observable<any> {
    const token = this.getToken();
    console.log('Получение информации о пользователе, токен:', token);
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    console.log('Заголовки запроса:', headers.get('Authorization'));
    
    return this.http.get(`${this.baseUrl}status/`, { headers }).pipe(
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
        console.log('Ответ от сервера:', response);
        
        if (response && response.access) {
          localStorage.setItem('authToken', response.access);
          console.log('Токен сохранен в localStorage:', localStorage.getItem('authToken'));
          
          setTimeout(() => {
            console.log('Токен из localStorage после задержки:', localStorage.getItem('authToken'));
          }, 100);
          
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
        console.error('Ошибка при регистрации:', error);
        return throwError(() => error);  
      })
    );
  }

  logout(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post(`${this.baseUrl}logout/`, { refresh: refreshToken }).pipe(
      tap(() => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
      }),
      catchError((error) => {
        console.error('Ошибка при выходе из системы:', error);
        return throwError(() => error);  
      })
    );
  }
}
