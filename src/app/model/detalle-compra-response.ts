import { IEstadoDetalleCompra } from "./estado-detalle-compra";
import { IPedidoCompraResponse } from "./pedido-compra-response";
import { IProductoResponse } from "./producto-response";

export interface IDetalleCompraResponse {
    idDetalleCompra?: number;
    pedidoCompra?: IPedidoCompraResponse;
    producto?: IProductoResponse;
    estadoDetalleCompra?: IEstadoDetalleCompra;
    cantidad: number;
    cantidadRecibida: number;
    montoSubtotalLinea: number;
}
