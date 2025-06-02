import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITipoComprobante } from '../model/tipo-comprobante';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class TipoComprobanteService {

  constructor(private http: HttpClient) { }
  getTipoComprobante(): Observable<ITipoComprobante[]>{
    return this.http.get<ITipoComprobante[]>(`${BASE_URL}/v1/tipocomprobante`);
  }
}
