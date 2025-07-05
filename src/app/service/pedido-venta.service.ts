import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPedidoVentaResponse } from '../model/pedido-venta-response';
import { IPedidoVentaRequest } from '../model/pedido-venta-request';
import { BASE_URL } from '../utils/constants';

@Injectable({ providedIn: 'root' })
export class PedidoVentaService {
  private apiUrl = `${BASE_URL}/cliente/pedidoventa`;

  constructor(private http: HttpClient) {}

  crearPedidoVenta(request: IPedidoVentaRequest): Observable<IPedidoVentaResponse> {
    return this.http.post<IPedidoVentaResponse>(this.apiUrl, request);
  }

  getPedidosPorCliente(idCliente: number): Observable<IPedidoVentaResponse[]> {
    return this.http.get<IPedidoVentaResponse[]>(`${this.apiUrl}/por-cliente?idCliente=${idCliente}`);
  }

  listarPedidosVentaSinDespacho(): Observable<IPedidoVentaResponse[]> {
    return this.http.get<IPedidoVentaResponse[]>(`${this.apiUrl}/sin-despacho`);
  }
}