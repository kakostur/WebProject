import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;

  getToken(): string | null {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  isOrganizer(): boolean {
    return this.getRole() === 'organizer';
  }

  setRole(role: string) {
    localStorage.setItem('userRole', role); // Сохранение роли в локальном хранилище
  }

  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  login(credentials: { email: string, password: string }) {
    console.log('Attempting to log in:', credentials);
    return {
      subscribe: (callbacks: { next: () => void; error: (error: any) => void }) => {
        setTimeout(() => {
          this.token = 'mock.jwt.token';
          callbacks.next();
        }, 1000);
      }
    };
  }

  logout() {
    this.token = null;
    localStorage.removeItem('userRole'); // Очищаем роль при выходе
  }
}
