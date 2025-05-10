import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrabajadoresService{
  private apiUrl = 'http://localhost:8080/api/v1/trabajador/trabajadores';

  constructor(private http: HttpClient) {}

  getTrabajadores(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}