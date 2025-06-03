import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDetalleCompraResponse } from '../model/detalle-compra-response';
import { BASE_URL } from '../utils/constants';
import { Observable } from 'rxjs';
import { IPedidoCompraRequest } from '../model/pedido-compra-request';

@Injectable({
  providedIn: 'root'
})
export class DetalleCompraService {

  constructor(private http: HttpClient) { }
  getDetalleComprabyCompraId(idPedido: number): Observable<IDetalleCompraResponse[]>{
    const pedidoRequest: IPedidoCompraRequest = {
          idPedidoCompra: idPedido,
          codigoCompra: 0,
          fechaPedido: '',
          montoTotal: 0,
          idProveedor: 0,
          idEstadoPedido: 0
        };
        return this.http.post<IDetalleCompraResponse[]>(`${BASE_URL}/almacen/detallecompra/find`, pedidoRequest);
  }
}
