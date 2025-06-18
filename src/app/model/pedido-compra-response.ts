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
  idPedidoCompra: number;
  codigoCompra: number;
  fechaPedido: string;
  montoTotal: number;
  proveedor: { razonSocial: string; ruc: string }; // <-- agrega ruc aquí
  estadoPedido: { descripcion: string };
}