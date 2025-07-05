import { IDetalleCotizacionResponse } from "./detalle-cotizacion-response";
import { IEstadoCotizacion } from "./estado-cotizacion";
import { ICliente } from "./cliente";

export interface ICotizacionResponse {
  idCotizacion: number;
  cliente: ICliente;
  estadoCotizacion: IEstadoCotizacion;
  codigoCotizacion: string;
  fechaEmision: string;
  descuento: number;
  montoSubtotal: number;
  montoIgv: number;
  montoTotal: number;
  detalles: IDetalleCotizacionResponse[];
}