export interface IDetalleCompraRequest {
    idDetalleCompra: number;
    idPedidoCompra: number;
    idProducto: number;
    idEstadoDetalleCompra: number;
    cantidad: number;
    cantidadRecibida: number;
    montoSubtotalLinea: number;
}
