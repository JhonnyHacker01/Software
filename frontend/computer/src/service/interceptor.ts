import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;

    const token = this.authService.getToken();
    const apiKey = 'ff6a73c3-daac-442e-a503-29c8365ab8ab';

    if (token) {
      request = req.clone({
        setHeaders: {
          Authorization: `Token ${token}`,
          'API-Key': apiKey
        }
      });
    }

    return next.handle(request);
  }
}