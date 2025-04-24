// /components/auth/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStateService } from '../services/auth-state.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private authStateService: AuthStateService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }
    
    this.isSubmitting = true;
    this.errorMessage = null;
    
    const credentials = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    
    // Единственный вызов логина
    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        
        // Сохраняем токен
        this.authStateService.setToken(response.access);
        console.log('Токен сохранен:', response.access);
        
        // Получаем информацию о пользователе
        this.authService.getUserInfo().subscribe({
          next: (userInfo) => {
            console.log('Получена информация о пользователе:', userInfo);
            this.authStateService.setRole(userInfo.role);
            
            // Определяем куда перенаправить пользователя
            const targetRoute = userInfo.role === 'organizer'
              ? '/event-management'
              : '/events';
            
            console.log('Перенаправление на:', targetRoute);
            
            this.router.navigate([targetRoute]).then(success => {
              console.log(`Навигация ${success ? 'успешна' : 'не удалась'}`);
            }).catch(err => {
              console.error('Ошибка навигации:', err);
            });
          },
          error: (err) => {
            console.error('Ошибка получения данных пользователя:', err);
            // При ошибке всё равно перенаправляем на страницу событий
            this.router.navigate(['/events']).then(success => {
              console.log(`Навигация при ошибке ${success ? 'успешна' : 'не удалась'}`);
            }).catch(err => {
              console.error('Ошибка навигации при ошибке:', err);
            });
          }
        });
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error.error?.non_field_errors?.[0] ||
                           error.error?.detail ||
                           'Login failed. Please check your credentials.';
      },
    });
  }

  
  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
