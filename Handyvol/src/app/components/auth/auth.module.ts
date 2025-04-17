import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from '../services/auth.interceptor';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginComponent, 
    RegisterComponent, 
    RouterModule.forChild([
      { path: 'login', loadComponent: () => import('./login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./register.component').then(m => m.RegisterComponent) }
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AuthModule {}
