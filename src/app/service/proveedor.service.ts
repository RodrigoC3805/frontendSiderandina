import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProveedor } from '../model/proveedor';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }
  getProveedor(): Observable<IProveedor[]>{
    return this.http.get<IProveedor[]>(`${BASE_URL}/proveedor`);
  }
}
