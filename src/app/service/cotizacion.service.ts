import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICotizacionRequest } from '../model/cotizacion-request';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  constructor(private http: HttpClient) {}

  crearCotizacion(request: ICotizacionRequest): Observable<any> {
    return this.http.post(`${BASE_URL}/cliente/cotizacion`, request);
  }

  getCotizacionesPorCliente(idCliente: number) {
  return this.http.get<any[]>(`${BASE_URL}/cliente/cotizacion/por-cliente?idCliente=${idCliente}`);
}

}