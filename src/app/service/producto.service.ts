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
    return this.http.get<IProductoResponse[]>(`${BASE_URL}/producto`);
  }
}