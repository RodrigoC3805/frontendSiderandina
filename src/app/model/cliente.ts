import { ITipoCliente } from "./tipo-cliente";
import { IUsuario } from "./usuario";

export interface ICliente {
    idCliente: number;
    tipoCliente: ITipoCliente;
    usuario: IUsuario;
    ruc: string;
    razonSocial: string;
    direccion: string;
    telefono: string;
}
