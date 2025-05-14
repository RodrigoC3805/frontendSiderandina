import { IComprobanteCompraRequest } from "./comprobante-compra-request";
import { IDetalleCompraResponse } from "./detalle-compra-response";
import { IPagoResponse } from "./pago-response";
import { IPedidoCompraResponse } from "./pedido-compra-response";

export interface ICompra {
    pedidoCompra: IPedidoCompraResponse;
    detallesCompra: IDetalleCompraResponse[];
    comprobanteCompra: IComprobanteCompraRequest;
    pago: IPagoResponse;
}
