import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICotizacionRequest } from '../model/cotizacion-request';

const BASE_URL = 'http://localhost:8080/api/v1'; // Ajusta si tu backend usa otro puerto

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  constructor(private http: HttpClient) {}

  crearCotizacion(request: ICotizacionRequest): Observable<any> {
    return this.http.post(`${BASE_URL}/cotizacion`, request);
  }
}