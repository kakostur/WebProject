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
  
    const credentials = this.loginForm.value;
  
    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.authStateService.setToken(response.access); 
        this.authStateService.setRole(response.role);
  
        const targetRoute =
          this.authStateService.getRole() === 'organizer'
            ? '/event-management'
            : '/events';
        this.router.navigate([targetRoute]);
      },
      error: (error) => {
        this.errorMessage = error.error?.non_field_errors || 'Login failed. Please check your credentials.';
      },
    });
  }
  
  

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
