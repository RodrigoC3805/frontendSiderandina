import { ICliente } from "./cliente";
import { IUsuario } from "./usuario";

export interface IRegisterRequest {
    usuario: IUsuario;
    cliente: ICliente;
}
