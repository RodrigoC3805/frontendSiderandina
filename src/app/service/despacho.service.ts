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
    // Enviar los datos como parámetros, no en el body
    return this.http.post<IDespachoResponse>(
      `${this.apiUrl}/programar`,
      null,
      {
        params: {
          idPedidoVenta: request.idPedidoVenta,
          fechaProgramada: request.fechaProgramada
        }
      }
    );
  }

  actualizarEstado(id: number, estado: string): Observable<IDespachoResponse> {
    return this.http.put<IDespachoResponse>(`${this.apiUrl}/${id}/estado`, null, { params: { estado } });
  }

  listarTodos(): Observable<IDespachoResponse[]> {
    return this.http.get<IDespachoResponse[]>(this.apiUrl);
  }

  listarPorEstado(estado: string): Observable<IDespachoResponse[]> {
    return this.http.get<IDespachoResponse[]>(`${this.apiUrl}/estado`, { params: { estado } });
  }

  listarPedidosVentaSinDespacho(): Observable<IPedidoVentaResponse[]> {
    return this.http.get<IPedidoVentaResponse[]>(`${BASE_URL}/cliente/pedidoventa/sin-despacho`);
  }
}