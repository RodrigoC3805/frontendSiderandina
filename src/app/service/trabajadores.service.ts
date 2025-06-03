import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class TrabajadoresService{
  //private baseUrl = 'http://localhost:8080/api/v1/trabajador';
  private baseUrl = 'http://localhost:8080/api/rrhh/trabajador';
 //private baseUrl = `${BASE_URL}/rrhh/trabajador`;

  constructor(private http: HttpClient) {}

  getTrabajadores(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/trabajadores');
  }
  getTrabajadorById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  crearTrabajador(trabajador: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, trabajador);
  }
  updateTrabajador(id: number, trabajadorRequest: any) {
    return this.http.put(`${this.baseUrl}/${id}`, trabajadorRequest);
  }

  buscarPorNumeroDocumento(numeroDocumento: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/buscar?numeroDocumento=${encodeURIComponent(numeroDocumento)}`);
  }
}