import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategoriaProducto } from '../model/categoria-producto';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProductoService {
  constructor(private http: HttpClient) {}
  getCategoriasProducto(): Observable<ICategoriaProducto[]>{
    return this.http.get<ICategoriaProducto[]>(`${BASE_URL}/v1/categoriaproducto`);
  }
}

