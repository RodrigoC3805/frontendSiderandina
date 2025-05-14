import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPedidoCompraResponse } from '../model/pedido-compra-response';
import { BASE_URL } from '../utils/constants';
import { ICompra } from '../model/compra';

@Injectable({
  providedIn: 'root'
})
export class PedidoCompraService {
  constructor(private http: HttpClient) { }
  getPedidosCompra(): Observable<IPedidoCompraResponse[]>{
    return this.http.get<IPedidoCompraResponse[]>(`${BASE_URL}/pedidocompra`);
  }
  realizarCompra(compra: ICompra): Observable<ICompra>{
    return this.http.post<ICompra>(`${BASE_URL}/pedidocompra/comprar`, compra);
  }
}
