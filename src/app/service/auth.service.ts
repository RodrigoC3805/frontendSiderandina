import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginRequest } from '../model/login-request';
import { ITokenResponse } from '../model/token-response';
import { BASE_URL } from '../utils/constants';
import { tap } from 'rxjs';
import { IRegisterRequest } from '../model/register-request';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  
  login(request: ILoginRequest){
    console.log('login service');
    return this.http
    .post<ITokenResponse>(`${BASE_URL}/auth/login`, request)
    .pipe(
      tap((res) => {
        localStorage.setItem('token', res?.token);
        this.router.navigate(['/sistema']);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  register(request: IRegisterRequest){
    console.log('Register data: ', request);
    return this.http
    .post<ITokenResponse>(`${BASE_URL}/auth/register`, request)
    .pipe(
      tap((res)=> {
        console.log('Register response', res);
      }),
      tap((res) => {
        localStorage.setItem('token', res?.token);
        this.router.navigate(['/sistema']);
      })
    );
  }
}
