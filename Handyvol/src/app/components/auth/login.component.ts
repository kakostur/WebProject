import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        // Navigate based on user role
        if (this.authService.isOrganizer()) {
          this.router.navigate(['/event-management']);
        } else {
          this.router.navigate(['/events']);
        }
      },
      error: (error) => {
        this.isSubmitting = false;
        this.errorMessage = error.message || 'Login failed. Please check your credentials.';
        // Для тестирования, если API не доступен
        console.log('Development redirect');
        setTimeout(() => this.router.navigate(['/events']), 2000);
      }
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}