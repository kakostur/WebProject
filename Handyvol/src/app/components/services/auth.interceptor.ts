//components/services/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStateService } from './auth-state.service';
import { SKIP_AUTH_INTERCEPTOR } from './auth.tokens';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authStateService: AuthStateService) {}

intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token = this.authStateService.getToken();
  
  console.log('Intercepting request to:', request.url);
  console.log('Token exists:', !!token);
  
  if (token) {
    request = request.clone({
      setHeaders: { 
        Authorization: `Bearer ${token}` 
      }
    });
    
    console.log('Request with auth header:', request.headers.get('Authorization'));
  }
  
  return next.handle(request);
}
}
