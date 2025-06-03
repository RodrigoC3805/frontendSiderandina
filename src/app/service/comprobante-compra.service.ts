import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComprobanteCompraResponse } from '../model/comprobante-compra-response';
import { BASE_URL } from '../utils/constants';
import { IPedidoCompraRequest } from '../model/pedido-compra-request';

@Injectable({
  providedIn: 'root'
})
export class ComprobanteCompraService {

  constructor(private http: HttpClient) { }
  getComprobanteCompraByPedidoId(idPedido: number): Observable<IComprobanteCompraResponse> {
    const pedidoRequest: IPedidoCompraRequest = {
      idPedidoCompra: idPedido,
      codigoCompra: 0,
      fechaPedido: '',
      montoTotal: 0,
      idProveedor: 0,
      idEstadoPedido: 0
    };
    
    return this.http.post<IComprobanteCompraResponse>(`${BASE_URL}/almacen/comprobantecompra/find`, pedidoRequest);
  }
}
