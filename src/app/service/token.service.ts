import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private getDecodedToken(): any | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedTokenString = atob(token.split('.')[1]);
      return JSON.parse(decodedTokenString);
    }
    return null;
  }
  getToken(): string {
    const decodedToken = this.getDecodedToken();
    if (decodedToken && decodedToken.email) {
      return decodedToken.email;
    }
    return '';
  }
  getRole(): string {
    const decodedToken = this.getDecodedToken();
    if (decodedToken && decodedToken.role) {
      return decodedToken.role;
    }
    return '';
  }
}
