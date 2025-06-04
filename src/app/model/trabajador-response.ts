import { ITipoDocumento } from "./tipo-documento";
import { IUsuario } from "./usuario";

export interface ITrabajadorResponse {
  idTrabajador: number;
  tipoDocumento: ITipoDocumento;
  numeroDocumento: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombres: string;
  emailContacto: string;
  usuario: IUsuario;
}
