import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidoCompraService } from '../../service/pedido-compra.service';
import { IPedidoCompraResponse } from '../../model/pedido-compra-response';
import { AuthService } from '../../service/auth.service';
import { ProveedorService } from '../../service/proveedor.service';
import { IProveedor } from '../../model/proveedor';

@Component({
  selector: 'app-pedido-proveedor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedido-proveedor.component.html',
  styleUrls: ['./pedido-proveedor.component.css'],
})
export class PedidoProveedorComponent implements OnInit {
  pedidos: IPedidoCompraResponse[] = [];
  idProveedor: number | null = null;
  filtroEstado: number | undefined = undefined;
  notificacionVisible = false;
  notificacionMensaje = '';
  infoTooltipVisible = false;
  infoTooltipPedidoId: number | null = null;
  infoMensaje = '';

  constructor(
    private pedidoService: PedidoCompraService,
    private authService: AuthService,
    private proveedorService: ProveedorService
  ) {}

  ngOnInit() {
    const userInfo: any = this.authService.getUserInfo();
    console.log('EMAIL DEL USUARIO:', userInfo.email); // <-- Verifica que esto no sea undefined
    if (userInfo && userInfo.email) {
      this.proveedorService.getProveedorByEmail(userInfo.email).subscribe({
        next: (proveedor: IProveedor) => {
          this.idProveedor = proveedor.idProveedor;
          this.cargarPedidos();
        },
        error: () => {
          this.idProveedor = null;
          this.pedidos = [];
        }
      });
    }
  }

  cargarPedidos() {
    if (this.idProveedor) {
      this.pedidoService.getPedidosByProveedor(this.idProveedor, this.filtroEstado).subscribe({
        next: (resp) => this.pedidos = resp,
        error: () => this.pedidos = []
      });
    } else {
      this.pedidos = [];
    }
  }

  onCambiarEstado(pedido: IPedidoCompraResponse, nuevoEstado: number) {
    this.pedidoService.actualizarEstadoPedido(pedido.idPedidoCompra!, nuevoEstado).subscribe({
      next: () => this.cargarPedidos()
    });
  }

  mostrarNotificacion(mensaje: string) {
    this.notificacionMensaje = mensaje;
    this.notificacionVisible = true;
    setTimeout(() => this.notificacionVisible = false, 2200);
  }

  marcarEnviado(pedido: IPedidoCompraResponse) {
    // idEstadoPedido = 2 para "Enviado"
    this.pedidoService.actualizarEstadoPedido(pedido.idPedidoCompra, 2).subscribe({
      next: () => {
        pedido.estadoPedido.descripcion = 'Enviado';
        this.mostrarNotificacion('¡Pedido marcado como Enviado!');
      }
    });
  }

  marcarEntregado(pedido: IPedidoCompraResponse) {
    // idEstadoPedido = 3 para "Entregado"
    this.pedidoService.actualizarEstadoPedido(pedido.idPedidoCompra, 3).subscribe({
      next: () => {
        pedido.estadoPedido.descripcion = 'Entregado';
        this.mostrarNotificacion('¡Pedido marcado como Entregado!');
      }
    });
  }

  setInfoMensaje(pedido: IPedidoCompraResponse) {
    this.infoMensaje = `
      <b>Código:</b> ${pedido.codigoCompra || '-'}<br>
      <b>Proveedor:</b> ${pedido.proveedor?.razonSocial || '-'}<br>
      <b>RUC:</b> ${pedido.proveedor?.ruc || '-'}<br>
      <b>Fecha:</b> ${pedido.fechaPedido ? (pedido.fechaPedido as string).replace('T', ' ').substring(0, 16) : '-'}<br>
      <b>Estado:</b> ${pedido.estadoPedido?.descripcion || '-'}<br>
      <b>Monto Total:</b> S/ ${pedido.montoTotal?.toFixed(2) || '-'}
    `;
    this.infoTooltipVisible = true;
    this.infoTooltipPedidoId = pedido.idPedidoCompra;
  }

  clearInfoMensaje() {
    this.infoTooltipVisible = false;
    this.infoTooltipPedidoId = null;
  }
}