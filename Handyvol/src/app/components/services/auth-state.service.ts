//components/services/auth-state.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private role: string | null = null;
  private token: string | null = null;

  setRole(role: string): void {
    this.role = role;
    localStorage.setItem('userRole', role);
  }

  getRole(): string | null {
    return this.role || localStorage.getItem('userRole');
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  clearState(): void {
    this.role = null;
    this.token = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  }
}
