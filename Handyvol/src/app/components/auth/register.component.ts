// components/auth/register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStateService } from '../services/auth-state.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private authService: AuthService,
    private authStateService: AuthStateService
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        role: ['volunteer', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: AbstractControl): ValidationErrors | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Please correct all errors before submitting.';
      return;
    }
    
    this.isSubmitting = true;
    this.errorMessage = null;
    
    const userData = {
      name: this.registerForm.value.name,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      role: this.registerForm.value.role
    };

    this.authService.register(userData).subscribe({
      next: () => {
        this.isSubmitting = false;
        alert('Registration successful! Please login.');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.isSubmitting = false;
        
        if (error.error) {
          // Формируем сообщение из ошибок сервера
          if (typeof error.error === 'object') {
            let errorMsg = '';
            for (const key in error.error) {
              if (error.error.hasOwnProperty(key)) {
                errorMsg += `${key}: ${error.error[key]}\n`;
              }
            }
            this.errorMessage = errorMsg || 'Registration failed. Please try again.';
          } else {
            this.errorMessage = error.error || 'Registration failed. Please try again.';
          }
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
      },
    });
  }
}