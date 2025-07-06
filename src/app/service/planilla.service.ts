import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlanillaResponse } from '../model/planilla-response';
import { DetallePlanillaResponse } from '../model/detalle-planilla-response';

@Injectable({
  providedIn: 'root'
})
export class PlanillaService {
  private apiUrl = 'http://localhost:8080/api/rrhh/planilla';

  constructor(private http: HttpClient) {}

  generarPlanilla(data: { mes: number, anio: number }): Observable<PlanillaResponse> {
    return this.http.post<PlanillaResponse>(`${this.apiUrl}/generar`, data);
  }

  listarPlanillas(anio?: number): Observable<PlanillaResponse[]> {
    let url = this.apiUrl;
    if (anio) url += `?anio=${anio}`;
    return this.http.get<PlanillaResponse[]>(url);
  }

  listarDetallePlanilla(idPlanilla: number): Observable<DetallePlanillaResponse[]> {
    return this.http.get<DetallePlanillaResponse[]>(`${this.apiUrl}/${idPlanilla}/detalle`);
  }
}