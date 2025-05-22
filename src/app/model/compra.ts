import { IComprobanteCompraRequest } from "./comprobante-compra-request";
import { IComprobanteCompraResponse } from "./comprobante-compra-response";
import { IDetalleCompraResponse } from "./detalle-compra-response";
import { IPagoResponse } from "./pago-response";
import { IPedidoCompraResponse } from "./pedido-compra-response";

export interface ICompra {
    pedidoCompra: IPedidoCompraResponse;
    detallesCompra: IDetalleCompraResponse[];
    comprobanteCompraRequest: IComprobanteCompraRequest;
    pago: IPagoResponse;
}
