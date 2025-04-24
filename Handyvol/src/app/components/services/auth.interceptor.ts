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
    if (request.context.get(SKIP_AUTH_INTERCEPTOR)) {
      return next.handle(request);
    }

    const token = this.authStateService.getToken();

    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(request);
  }
}
