export interface IPedidoCompraRequest {
    idPedidoCompra: number;
    codigoCompra: number;
    fechaPedido: string;
    montoTotal: number;
    idProveedor: number;
    idEstadoPedido: number;
}
