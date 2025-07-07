import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAsistenciaRequest } from '../model/asistencia';
import { BASE_URL } from '../utils/constants';
import { Observable } from 'rxjs';
import { ReportePuntualidad } from '../model/reporte-puntualidad';
import { ReporteAsistencia } from '../model/reporte-asistencia';
import { ReporteHorasExtras } from '../model/reporte-horas-extras';

@Injectable({ providedIn: 'root' })
export class AsistenciaService {
  constructor(private http: HttpClient) {}

  registrarIngreso(asistencia: IAsistenciaRequest) {
    return this.http.post(`${BASE_URL}/rrhh/asistencia/ingreso`, asistencia);
  }

  registrarSalida(asistencia: IAsistenciaRequest) {
    return this.http.post(`${BASE_URL}/rrhh/asistencia/salida`, asistencia);
  }

  getAsistencias() {
    return this.http.get<any[]>(`${BASE_URL}/rrhh/asistencia`);
  }

  buscarAsistenciasPorDocumento(numeroDocumento: string) {
    return this.http.get<any[]>(`${BASE_URL}/rrhh/asistencia/por-documento?numeroDocumento=${encodeURIComponent(numeroDocumento)}`);
  }

  obtenerReporteHorasTrabajadas(fechaInicio?: string, fechaFin?: string): Observable<ReporteAsistencia[]> {
    let params: any = {};
    if (fechaInicio) params.fechaInicio = fechaInicio;
    if (fechaFin) params.fechaFin = fechaFin;
    return this.http.get<ReporteAsistencia[]>(`${BASE_URL}/rrhh/asistencia/reporte-horas`, { params });
  }

  obtenerReportePuntualidad(fechaInicio?: string, fechaFin?: string): Observable<ReportePuntualidad> {
    let params: any = {};
    if (fechaInicio) params.fechaInicio = fechaInicio;
    if (fechaFin) params.fechaFin = fechaFin;
    return this.http.get<ReportePuntualidad>(`${BASE_URL}/rrhh/asistencia/reporte-puntualidad`, { params });
  }

  obtenerReporteHorasExtras(fechaInicio?: string, fechaFin?: string) {
    let params: any = {};
    if (fechaInicio) params.fechaInicio = fechaInicio;
    if (fechaFin) params.fechaFin = fechaFin;
    return this.http.get<ReporteHorasExtras[]>(`${BASE_URL}/rrhh/asistencia/reporte-horas-extras`, { params });
  }

}