import { IProductoResponse } from "./producto-response";

export interface IDetalleCotizacionResponse {
    idDetalleCotizacion: number;
    producto: IProductoResponse;
    cantidad: number;
    precioCotizado: number;
    montoSubtotalLinea: number;
}
