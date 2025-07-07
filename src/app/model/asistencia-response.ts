import { ITrabajadorResponse } from "./trabajador-response";

export interface IAsistenciaResponse {
    idAsistencia: number;
    trabajador: ITrabajadorResponse;
    fecha: string;
    horaIngreso: string;
    horaSalida: string;
}
