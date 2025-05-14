import { IEstadoPedido } from "./estado-pedido";
import { IProveedor } from "./proveedor";

export interface IPedidoCompraResponse {
    idPedidoCompra?: number;
    codigoCompra?: number;
    fechaPedido: string;
    montoTotal: number;
    proveedor: IProveedor;
    estadoPedido: IEstadoPedido;
}
