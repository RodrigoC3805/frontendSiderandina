export interface IComprobanteCompraRequest {
    idComprobanteCompra?: number;
    idPedidoCompra?: number;
    idPago?: number;
    idTipoComprobante: number;
    numeroComprobante?: number;
    fechaEmision: string;
}
