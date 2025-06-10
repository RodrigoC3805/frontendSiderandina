import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAsistenciaRequest } from '../model/asistencia';
import { BASE_URL } from '../utils/constants';

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
}