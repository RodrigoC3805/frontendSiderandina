import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    // Solo agrega el header si la URL es de tu API
    if (token && req.url.startsWith('https://dswg3siderandina.onrender.com')) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Agregando header Authorization:', cloned);
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
