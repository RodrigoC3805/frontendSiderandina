import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrabajadoresService{
  private baseUrl = 'http://localhost:8080/api/v1/trabajador';

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
}