import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPedidoCompraResponse } from '../model/pedido-compra-response';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class PedidoCompraService {
  constructor(private http: HttpClient) { }

  getPedidosByProveedor(idProveedor: number, idEstadoPedido?: number): Observable<IPedidoCompraResponse[]> {
    let url = `http://localhost:8080/api/almacen/pedidocompra/proveedor?idProveedor=${idProveedor}`;
    if (idEstadoPedido !== undefined) {
      url += `&idEstadoPedido=${idEstadoPedido}`;
    }
    return this.http.get<IPedidoCompraResponse[]>(url);
  }

  actualizarEstadoPedido(idPedidoCompra: number, idEstadoPedido: number) {
    return this.http.put(
      'http://localhost:8080/api/almacen/pedidocompra/actualizar-estado',
      { idPedidoCompra, idEstadoPedido }
    );
  }

  getPedidosCompra(idEstadoPedido?: number) {
    let url = `${BASE_URL}/almacen/pedidocompra`;
    if (idEstadoPedido !== undefined) {
      url += `?idEstadoPedido=${idEstadoPedido}`;
    }
    return this.http.get<IPedidoCompraResponse[]>(url);
  }

  realizarCompra(compra: any): Observable<any> {
    return this.http.post(`${BASE_URL}/almacen/pedidocompra/comprar`, compra);
  }
  getPedidosEnviadosYEntregados(): Observable<IPedidoCompraResponse[]> {
    return this.http.get<IPedidoCompraResponse[]>(`${BASE_URL}/almacen/pedidocompra/pedidosenviados-entregados`);
  }
}
