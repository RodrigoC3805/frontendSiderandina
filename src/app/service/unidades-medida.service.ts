import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUnidadesMedida } from '../model/unidades-medida';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class UnidadesMedidaService {

  constructor(private http:HttpClient) { }
  getUnidadesMedida() : Observable<IUnidadesMedida[]>{
    return this.http.get<IUnidadesMedida[]>(`${BASE_URL}/v1/unidadesmedida`);
  }
}
