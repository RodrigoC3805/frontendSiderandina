import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReporteProveedorCompras } from '../model/reporte-proveedor-compras';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ReporteComercialService {

  private apiUrl = `${BASE_URL}/reportes/comercial`;

  constructor(private http: HttpClient) {}

  obtenerProveedoresPorCompras(): Observable<ReporteProveedorCompras[]> {
    return this.http.get<ReporteProveedorCompras[]>(`${this.apiUrl}/proveedores-compras`);
  }
}