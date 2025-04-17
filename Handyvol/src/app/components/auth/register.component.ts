import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service'; // Убедись, что путь правильный

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      role: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      console.log('User registered:', this.registerForm.value);

      // Сохраняем роль в AuthService
      this.authService.setRole(this.registerForm.value.role);

      // Делаем редирект через setTimeout (иногда помогает избежать багов)
      setTimeout(() => {
        const redirectUrl = this.registerForm.value.role === 'organizer' ? '/event-management' : '/events';
        this.router.navigate([redirectUrl]);
      }, 500);
    }
  }
}
