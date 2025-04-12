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
    const storedToken = localStorage.getItem(this.tokenKey);
    const storedUser = localStorage.getItem(this.userKey);
    
    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (e) {
        // Invalid stored user, clear storage
        this.logout();
      }
    }
  }
  
  register(userData: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, userData)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  login(credentials: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => this.handleAuthentication(response)),
        catchError(this.handleError)
      );
  }
  
  private handleAuthentication(response: AuthResponse): void {
    const { token, user } = response;
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
    this.currentUserSubject.next(user);
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
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else if (error.status) {
      // Server-side error
      errorMessage = error.error?.message || `Error: ${error.status}`;
      
      if (error.status === 401) {
        // Unauthorized - clear stored credentials
        this.logout();
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
}