import { ITipoUsuario } from "./tipo-usuario";

export interface IUsuario {
    idUsuario: number;
    tipoUsuario: ITipoUsuario;
    email: string;
    password: string;
}
