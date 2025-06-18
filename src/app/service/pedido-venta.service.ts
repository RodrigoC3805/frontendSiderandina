import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPedidoVentaRequest } from '../model/pedido-venta-request';
import { IPedidoVentaResponse } from '../model/pedido-venta-response';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/api/cliente/pedidoventa';

@Injectable({ providedIn: 'root' })
export class PedidoVentaService {
  constructor(private http: HttpClient) {}

  crearPedidoVenta(request: IPedidoVentaRequest): Observable<IPedidoVentaResponse> {
    return this.http.post<IPedidoVentaResponse>(BASE_URL, request);
  }
}