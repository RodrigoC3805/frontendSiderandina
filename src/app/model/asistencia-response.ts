import { ITrabajadorResponse } from "./trabajador-response";

export interface IAsistenciaResponse {
    idAsistencia: number;
    trabajador: ITrabajadorResponse;
    fecha: string;
    hora_entrada: string;
    hora_salida: string;
}
