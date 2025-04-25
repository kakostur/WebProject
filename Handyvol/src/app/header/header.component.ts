import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../components/services/auth.service';
import { AuthStateService } from '../components/services/auth-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // Флаги для отображения компонентов
  isLoggedIn = false;
  userRole: string | null = null;

  constructor(
    private authService: AuthService,
    private authStateService: AuthStateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Проверяем статус авторизации при загрузке компонента
    this.checkAuthStatus();
  }

  // Метод для проверки статуса авторизации
  checkAuthStatus(): void {
    this.isLoggedIn = this.authStateService.isAuthenticated();
    this.userRole = this.authStateService.getRole();
  }

  // Метод для выхода из системы
logout(): void {
  this.authService.logout().subscribe({
    next: () => {
      // Перенаправляем пользователя на главную страницу
      this.router.navigate(['/'])
        .then(() => {
          // После перехода обновляем страницу
          window.location.reload();
        });
    },
    error: (error) => {
      console.error('Ошибка при выходе из системы:', error);
      // Даже при ошибке перенаправляем пользователя и обновляем страницу
      this.router.navigate(['/'])
        .then(() => {
          window.location.reload();
        });
    }
  });
}
}