export interface IDetalleCotizacionRequest {
  idProducto: number;
  cantidad: number;
}

export interface ICotizacionRequest {
  idCliente: number;
  detalles: IDetalleCotizacionRequest[];
}