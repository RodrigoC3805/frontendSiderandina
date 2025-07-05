// frontendSiderandina/src/app/service/despacho.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../utils/constants';
import { IDespachoRequest } from '../model/despacho-request';
import { IDespachoResponse } from '../model/despacho-response';
import { IPedidoVentaResponse } from '../model/pedido-venta-response';

@Injectable({ providedIn: 'root' })
export class DespachoService {
  private apiUrl = `${BASE_URL}/ventas/despacho`;

  constructor(private http: HttpClient) {}

  programar(request: IDespachoRequest): Observable<IDespachoResponse> {
    return this.http.post<IDespachoResponse>(`${this.apiUrl}/programar`, request);
  }

  actualizarEstado(id: number, estado: string): Observable<IDespachoResponse> {
    return this.http.put<IDespachoResponse>(`${this.apiUrl}/${id}/estado?estado=${estado}`, {});
  }

  listarTodos(): Observable<IDespachoResponse[]> {
    return this.http.get<IDespachoResponse[]>(this.apiUrl);
  }

  listarPorEstado(estado: string): Observable<IDespachoResponse[]> {
    return this.http.get<IDespachoResponse[]>(`${this.apiUrl}/estado?estado=${estado}`);
  }
  
  listarPedidosVentaSinDespacho(): Observable<IPedidoVentaResponse[]> {
    return this.http.get<IPedidoVentaResponse[]>(`${BASE_URL}/cliente/pedidoventa/sin-despacho`);
  }
}