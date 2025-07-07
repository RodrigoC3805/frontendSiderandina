import { IAsistenciaRequest } from "./asistencia";
import { IAsistenciaResponse } from "./asistencia-response";
import { IEstadoJustificacion } from "./estado-justificacion";
import { IMotivoJustificacion } from "./motivo-justificacion";

export interface IJustificacionResponse {
    idJustificacion: number;
    asistenciaDiaria: IAsistenciaResponse;
    motivoJustificacion: IMotivoJustificacion;
    fechaSolicitud: string;
    estadoJustificacion: IEstadoJustificacion;  
}
