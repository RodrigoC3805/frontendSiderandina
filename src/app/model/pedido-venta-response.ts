export interface IPedidoVentaResponse {
  idPedidoVenta: number;
  idCotizacion: number;
  idEstadoPedido: number;
  codigoVenta: string;
  fechaPedido: string;
  direccionEntrega: string;
  //estadoPedido?: { idEstadoPedido: number; descripcion: string };
  estadoPedidoDescripcion: string;
  //cotizacion?: { montoTotal: number };
  montoTotalCotizacion: number;
}