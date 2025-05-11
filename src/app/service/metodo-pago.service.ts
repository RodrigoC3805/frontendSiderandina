import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMetodoPago } from '../model/metodo-pago';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  constructor(private http: HttpClient) { }
  getMetodosPago(): Observable<IMetodoPago[]>{
    return this.http.get<IMetodoPago[]>(`${BASE_URL}/,metodopago`);
  }
}
