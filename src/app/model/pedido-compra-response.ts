export interface IProveedor {
    idProveedor: number;
    razonSocial: string;
    ruc: string;
    direccion?: string;
    email?: string;
    telefono?: string;
}

export interface IEstadoPedido {
  idEstadoPedido: number;
  descripcion: string;
}

export interface IPedidoCompraResponse {
    idPedidoCompra?: number;
    codigoCompra?: number;
    fechaPedido: string;
    montoTotal: number;
    proveedor: { idProveedor: number; razonSocial: string; ruc: string };
    estadoPedido: { idEstadoPedido: number; descripcion: string };
}