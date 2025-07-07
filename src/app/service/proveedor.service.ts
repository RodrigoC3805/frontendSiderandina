import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProveedor } from '../model/proveedor';

const BASE_URL = 'http://localhost:8080/api/v1/proveedor';

@Injectable({ providedIn: 'root' })
export class ProveedorService {
  constructor(private http: HttpClient) {}

  // Para obtener todos los proveedores (para selects, etc)
  getProveedores(): Observable<IProveedor[]> {
    return this.http.get<IProveedor[]>(`${BASE_URL}`);
  }
  
  // Este método busca el proveedor por la razon social
  getProveedorByRazonSocial(razonSocial: string): Observable<IProveedor> {
    return this.http.get<IProveedor>(`${BASE_URL}/por-razon-social?razonSocial=${encodeURIComponent(razonSocial)}`);
  }

  // Este método busca el proveedor por el email
  getProveedorByEmail(email: string): Observable<IProveedor> {
    return this.http.get<IProveedor>(`${BASE_URL}/por-email?email=${encodeURIComponent(email)}`);
  }
}
