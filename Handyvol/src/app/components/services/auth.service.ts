import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

interface User {
  id: string;
  email: string;
  fullName: string;
  userType: 'volunteer' | 'organizer';
}

interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private apiUrl = environment.apiUrl;
  private tokenKey = 'auth_token';
  private userKey = 'current_user';
  
  constructor(private http: HttpClient) {
    this.loadStoredUser();
  }
  
  private loadStoredUser(): void {
    try {
      const storedToken = localStorage.getItem(this.tokenKey);
      const storedUser = localStorage.getItem(this.userKey);
      
      if (storedToken && storedUser) {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
        console.log('User authentication data loaded successfully');
      }
    } catch (e) {
      console.error('Error loading stored user data:', e);
      this.logout();
    }
  }
  
  register(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, userData)
      .pipe(
        catchError(this.handleError)
      );
  }
  
private testMode = true;

login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    if (this.testMode) {
      return new Observable(observer => {
        setTimeout(() => {
          const testResponse: AuthResponse = {
            token: 'test-token-' + Date.now(),
            user: {
              id: '1',
              email: credentials.email,
              fullName: 'Test User',
              userType: 'volunteer'
            }
          };
          this.handleAuthentication(testResponse);
          observer.next(testResponse);
          observer.complete();
        }, 1000);
      });
    }
    
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => this.handleAuthentication(response)),
        catchError(this.handleError)
      );
  }
  
  private handleAuthentication(response: AuthResponse): void {
    try {
      const { token, user } = response;
      localStorage.setItem(this.tokenKey, token);
      localStorage.setItem(this.userKey, JSON.stringify(user));
      this.currentUserSubject.next(user);
      console.log('User authentication data saved successfully');
    } catch (error) {
      console.error('Error saving authentication data:', error);
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.currentUserSubject.next(null);
  }
  
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
  
  isOrganizer(): boolean {
    const currentUser = this.currentUserSubject.value;
    return !!currentUser && currentUser.userType === 'organizer';
  }
  
  isVolunteer(): boolean {
    const currentUser = this.currentUserSubject.value;
    return !!currentUser && currentUser.userType === 'volunteer';
  }
  
  private handleError(error: any) {
    let errorMessage = 'An error occurred';
    
    console.error('API Error:', error);
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else if (error.status) {
      if (error.status === 0) {
        errorMessage = 'Cannot connect to server. Please check your internet connection.';
      } else {
        errorMessage = error.error?.message || `Server Error: ${error.status} - ${error.statusText}`;
      }
      
      if (error.status === 401) {
        this.logout();
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
}