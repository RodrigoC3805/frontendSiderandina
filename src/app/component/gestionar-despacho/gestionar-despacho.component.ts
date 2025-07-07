import { Component, OnInit } from '@angular/core';
import { DespachoService } from '../../service/despacho.service';
import { IDespachoRequest } from '../../model/despacho-request';
import { IDespachoResponse } from '../../model/despacho-response';
import { IPedidoVentaResponse } from '../../model/pedido-venta-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestionar-despacho',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestionar-despacho.component.html',
  styleUrls: ['./gestionar-despacho.component.css']
})
export class GestionarDespachoComponent implements OnInit {
  pedidosSinDespacho: IPedidoVentaResponse[] = [];
  despachos: IDespachoResponse[] = [];
  pedidoSeleccionado: IPedidoVentaResponse | null = null;
  nuevoDespacho: IDespachoRequest = { idPedidoVenta: 0, fechaProgramada: '', estado: 'Pendiente' };
  estadoFiltro: string = '';

  // Notificación tipo toast
  notificacionMensaje: string = '';
  notificacionVisible: boolean = false;
  notificacionTipo: 'success' | 'error' = 'success';

  constructor(private despachoService: DespachoService) {}

  ngOnInit(): void {
    this.cargarPedidosSinDespacho();
    this.cargarDespachos();
  }

  cargarPedidosSinDespacho() {
    this.despachoService.listarPedidosVentaSinDespacho().subscribe({
      next: data => this.pedidosSinDespacho = data,
      error: () => this.pedidosSinDespacho = []
    });
  }

  cargarDespachos() {
    if (this.estadoFiltro) {
      this.despachoService.listarPorEstado(this.estadoFiltro).subscribe({
        next: data => this.despachos = data,
        error: () => this.despachos = []
      });
    } else {
      this.despachoService.listarTodos().subscribe({
        next: data => this.despachos = data,
        error: () => this.despachos = []
      });
    }
  }

seleccionarPedidoParaDespacho(pedido: IPedidoVentaResponse) {
  this.pedidoSeleccionado = pedido;
  this.nuevoDespacho.idPedidoVenta = pedido.idPedidoVenta;
  const hoy = new Date();
  const yyyy = hoy.getFullYear();
  const mm = String(hoy.getMonth() + 1).padStart(2, '0');
  const dd = String(hoy.getDate()).padStart(2, '0');
  this.nuevoDespacho.fechaProgramada = `${yyyy}-${mm}-${dd}`;
}

  programarDespacho() {
    if (!this.nuevoDespacho.idPedidoVenta || !this.nuevoDespacho.fechaProgramada) {
      this.mostrarNotificacion('Selecciona un pedido y una fecha válida', 'error');
      return;
    }
    this.despachoService.programar(this.nuevoDespacho).subscribe({
      next: () => {
        this.cargarDespachos();
        this.cargarPedidosSinDespacho();
        this.pedidoSeleccionado = null;
        this.nuevoDespacho = { idPedidoVenta: 0, fechaProgramada: '', estado: 'Pendiente' };
        this.mostrarNotificacion('Despacho programado correctamente', 'success');
      },
      error: () => {
        this.mostrarNotificacion('Error al programar el despacho', 'error');
      }
    });
  }

  actualizarEstadoDespacho(despacho: IDespachoResponse, nuevoEstado: string) {
    this.despachoService.actualizarEstado(despacho.idDespacho, nuevoEstado).subscribe({
      next: () => {
        this.cargarDespachos();
        this.mostrarNotificacion('Estado actualizado correctamente', 'success');
      },
      error: () => {
        this.mostrarNotificacion('Error al actualizar el estado', 'error');
      }
    });
  }

  mostrarNotificacion(mensaje: string, tipo: 'success' | 'error' = 'success') {
    this.notificacionMensaje = mensaje;
    this.notificacionTipo = tipo;
    this.notificacionVisible = true;
    setTimeout(() => this.notificacionVisible = false, 3000);
  }

  getCodigoVentaPorId(idPedidoVenta: number): string {
    let pedido = this.pedidosSinDespacho.find(p => p.idPedidoVenta === idPedidoVenta);
    if (pedido) return pedido.codigoVenta;
    return '';
  }
}