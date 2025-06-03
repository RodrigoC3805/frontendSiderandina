import { Injectable } from '@angular/core';
import { IEstadoDetalleCompra } from '../model/estado-detalle-compra';
import { BASE_URL } from '../utils/constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoDetalleCompraService {

  constructor(private http: HttpClient) { }
  getEstadosDetalleCompra(): Observable<IEstadoDetalleCompra[]>{
      return this.http.get<IEstadoDetalleCompra[]>(`${BASE_URL}/v1/estadodetallecompra`);
    }
}
