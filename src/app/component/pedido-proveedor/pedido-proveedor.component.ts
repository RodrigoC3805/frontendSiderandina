import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidoCompraService } from '../../service/pedido-compra.service';
import { IPedidoCompraResponse } from '../../model/pedido-compra-response';

@Component({
  selector: 'app-pedido-proveedor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedido-proveedor.component.html',
})
export class PedidoProveedorComponent implements OnInit {
  pedidos: IPedidoCompraResponse[] = [];
  filtroEstado: number | undefined = undefined; // "Todos" por defecto
  idProveedor: number | null = null;

  constructor(private pedidoService: PedidoCompraService) {}

  ngOnInit() {
    this.cargarPedidos();
  }

  cargarPedidos() {
    if (this.idProveedor) {
      this.pedidoService.getPedidosByProveedor(this.idProveedor, this.filtroEstado).subscribe({
        next: (resp) => this.pedidos = resp,
        error: () => this.pedidos = []
      });
    } else {
      this.pedidoService.getPedidosCompra(this.filtroEstado).subscribe({
        next: (resp) => this.pedidos = resp,
        error: () => this.pedidos = []
      });
    }
  }

  onCambiarEstado(pedido: IPedidoCompraResponse, nuevoEstado: number) {
    this.pedidoService.actualizarEstadoPedido(pedido.idPedidoCompra!, nuevoEstado).subscribe({
      next: () => this.cargarPedidos()
    });
  }
}