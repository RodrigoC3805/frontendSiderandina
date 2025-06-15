import { HttpClient, HttpXsrfTokenExtractor } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ILoginRequest } from '../model/login-request';
import { ITokenResponse } from '../model/token-response';
import { BASE_URL } from '../utils/constants';
import { map, Observable, of, shareReplay, tap } from 'rxjs';
import { IRegisterRequest } from '../model/register-request';
import { Token } from '@angular/compiler';
import { jwtDecode } from 'jwt-decode';
import { ITrabajadorResponse } from '../model/trabajador-response';
import { ICliente } from '../model/cliente';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  private nombreUsuario$?: Observable<string>;
  
  login(request: ILoginRequest) {
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
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  register(request: IRegisterRequest) {
    console.log('Register data: ', request);
    return this.http
      .post<ITokenResponse>(`${BASE_URL}/auth/register`, request)
      .pipe(
        tap((res) => {
          console.log('Register response', res);
        }),
        tap((res) => {
          localStorage.setItem('token', res?.token);
          this.router.navigate(['/sistema']);
        })
      );
  }
  getUserInfo() {
    const token = localStorage.getItem('token');
    try {
      return jwtDecode(token);
    } catch (e) {
      return null;
    }
  }

  getNombreUsuario() {
    if (!this.nombreUsuario$) {
      this.nombreUsuario$ = this.findUsername().pipe(shareReplay(1));
    }
    return this.nombreUsuario$;
  }

  findUsername() {
    const userInfo: any = this.getUserInfo();
    if (!userInfo) {
      // Si no hay usuario logueado, retorna un observable con un string genérico
      return of('Invitado');
    }
    if (userInfo && userInfo.tipoUsuario == 7)
      return this.findUsernameCliente(userInfo.email);
    return this.findUsernameTrabajador(userInfo.email);
  }

  findUsernameCliente(email: string) {
    return this.http
      .get<ICliente>(`${BASE_URL}/cliente/findclientebyuseremail`, {
        params: { email },
      })
      .pipe(map((cliente) => cliente.razonSocial));
  }
  findIdCliente() {
    const userInfo: any = this.getUserInfo();
    const email = userInfo.email;
    return this.http
      .get<ICliente>(`${BASE_URL}/cliente/findclientebyuseremail`, {
        params: { email },
      })
      .pipe(map((cliente) => cliente.idCliente));
  }
  findUsernameTrabajador(email: string) {
    return this.http
      .get<ITrabajadorResponse>(`${BASE_URL}/auth/findtrabajadorbyuseremail`, {
        params: { email },
      })
      .pipe(
        map((trabajador) => trabajador.nombres + ' ' + trabajador.apellidoPaterno)
      );
  }
  
  getTipoUsuario() {
    const userInfo: any = this.getUserInfo();
    if (!userInfo) {
      console.log('Invitado');
      return 'INVITADO'; // Retorna 0 si no hay usuario logueado
    }
    console.log('Tipo de usuario: ', userInfo.tipoUsuario);
    return userInfo.tipoUsuario.toUpperCase();
  }

}
