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
    formData.append(
      'request',
      new Blob([JSON.stringify(request)], { type: 'application/json' })
    );
    formData.append('doc_sustento', docSustento);

    return this.http.post<any>(
      `${BASE_URL}/rrhh/justificacion/create`,
      formData
    );
  }
}
