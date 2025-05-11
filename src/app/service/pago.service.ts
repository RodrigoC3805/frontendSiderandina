import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagoRequest } from '../model/pago-request';
import { IPagoResponse } from '../model/pago-response';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(private http: HttpClient) { }
  getPago(): Observable<IPagoResponse[]> {
    return this.http.get<IPagoResponse[]>(`${BASE_URL}/pago`);
   }
}
