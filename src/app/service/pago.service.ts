import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagoRequest } from '../model/pago-request';
import { IPagoResponse } from '../model/pago-response';
//import { BASE_URL } from '../utils/constants';

const BASE_URL = 'http://localhost:8080/api/cliente/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(private http: HttpClient) { }
  
  /*
  getPago(): Observable<IPagoResponse[]> {
    return this.http.get<IPagoResponse[]>(`${BASE_URL}/v1/pago`);
   }
  */
  
  registrarPago(request: IPagoRequest): Observable<any> {
    return this.http.post(BASE_URL, request);
  }

}
