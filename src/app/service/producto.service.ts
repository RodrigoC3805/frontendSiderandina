import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProductoResponse } from '../model/producto-response';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http:HttpClient) { }
  getProductos():Observable<IProductoResponse[]>{
    // Realiza una petición GET al backend para obtener la lista completa de productos
    return this.http.get<IProductoResponse[]>(`${BASE_URL}/producto`);
  }

  // Llama al backend para buscar productos por nombre
  buscarProductosPorNombre(nombre: string): Observable<IProductoResponse[]> {
    return this.http.get<IProductoResponse[]>(`${BASE_URL}/producto/buscar?nombre=${encodeURIComponent(nombre)}`);
  }
}