import { IMetodoPago } from "./metodo-pago";

export interface IPagoResponse {
    idPago?: number;
    metodoPago: IMetodoPago;
    montoPagado: number;
}
