import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IJustificacionRequest } from '../model/justificacion-request';
import { Observable } from 'rxjs';
import { BASE_URL } from '../utils/constants';

@Injectable({
  providedIn: 'root',
})
export class JustificacionService {
  constructor(private http: HttpClient) {}

  crearJustificacion(
    request: IJustificacionRequest,
    docSustento: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('idTrabajador', request.idTrabajador?.toString() ?? '');
    formData.append('dia_asistencia', request.dia_asistencia);
    formData.append('hora_entrada', request.hora_entrada);
    formData.append('hora_salida', request.hora_salida);
    formData.append('fechaSolicitud', request.fechaSolicitud);
    formData.append('idMotivoJustificacion', request.idMotivoJustificacion);
    if (docSustento) {
      formData.append('doc_sustento', docSustento);
    }

    return this.http.post<any>(
      `${BASE_URL}/rrhh/justificacion/create`,
      formData
    );
  }
  getMotivoJustificacion(): Observable<any> {
    return this.http.get<any>(
      `${BASE_URL}/rrhh/justificacion/getmotivojustificacion`
    );
  }
  getMisJustificaciones(idTrabajador: number): Observable<any> {
    return this.http.get<any>(
      `${BASE_URL}/rrhh/justificacion/getmisjustificaciones`,
      { params: { idTrabajador } }
    );
  }
  descargarArchivo(idJustificacion: number): Observable<Blob> {
    return this.http.get(
      `${BASE_URL}/rrhh/justificacion/getdocsustento?idJustificacion=${idJustificacion}`,
      {
        responseType: 'blob',
      }
    );
  }
}
