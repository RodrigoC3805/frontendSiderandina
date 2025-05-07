import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEstadoPedido } from '../model/estado-pedido';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class EstadoPedidoService {

  constructor(private http: HttpClient) { }
  getEstadoPedido(): Observable<IEstadoPedido[]>{
    return this.http.get<IEstadoPedido[]>(`${BASE_URL}/estadopedido`);
  }
}
