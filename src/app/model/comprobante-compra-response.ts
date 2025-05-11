import { IPedidoCompraResponse } from "./pedido-compra-response";
import { IPagoResponse } from "./pago-response";
import { ITipoComprobante } from "./tipo-comprobante";
export interface IComprobanteCompraResponse {
    idComprobanteCompra: number;
    pedidoCompra: IPedidoCompraResponse;
    pago: IPagoResponse;
    tipoComprobante: ITipoComprobante;
    numeroComprobante: number;
    fechaEmision: string;
}
