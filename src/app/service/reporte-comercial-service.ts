import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReporteProveedorCompras } from '../model/reporte-proveedor-compras';
import { ReportePedidosProveedor } from '../model/reporte-pedido-por-proveedor';
import { ProductoMasVendido } from '../model/producto-mas-vendido';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ReporteComercialService {

  private apiUrl = `${BASE_URL}/reportes/comercial`;

  constructor(private http: HttpClient) {}

  obtenerProveedoresPorCompras(): Observable<ReporteProveedorCompras[]> {
    return this.http.get<ReporteProveedorCompras[]>(`${this.apiUrl}/proveedores-compras`);
  }

  obtenerPedidosPorProveedor(fechaInicio: string, fechaFin: string): Observable<ReportePedidosProveedor[]> {
    return this.http.get<ReportePedidosProveedor[]>(`${this.apiUrl}/pedidos-por-proveedor`, {
      params: { fechaInicio, fechaFin }
    });
  }

  obtenerProductosMasVendidos() {
    return this.http.get<ProductoMasVendido[]>(`${this.apiUrl}/productos-mas-vendidos`);
  }

}