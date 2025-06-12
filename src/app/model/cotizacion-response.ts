import { ICliente } from "./cliente";
import { IEstadoCotizacion } from "./estado-cotizacion";

export interface ICotizacionResponse {
    idCotizacion: number;
    cliente: ICliente;
    estadoCotizacion: IEstadoCotizacion;
    codigoCotizacion: string;
    fechaEmision: string;
    montoSubtotal: number;
    montoIGV: number;
    montoTotal: number;
    descuento: number;
}
