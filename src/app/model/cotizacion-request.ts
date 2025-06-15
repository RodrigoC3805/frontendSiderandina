import { IDetalleCotizacionRequest } from "./detalle-cotizacion-request";


export interface ICotizacionRequest {
  idCliente: number;
  detalles: IDetalleCotizacionRequest[];
}