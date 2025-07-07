import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../utils/constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    // Solo agrega el header si la URL es de tu API
    if (token && req.url.startsWith(`${BASE_URL}`)) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Agregando header Authorization:', cloned);
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
