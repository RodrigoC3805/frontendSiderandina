import { Component, OnInit } from '@angular/core';
import { IPedidoVentaResponse } from '../../model/pedido-venta-response';
import { DespachoService } from '../../service/despacho.service';
import { IDespachoRequest } from '../../model/despacho-request';
import { IDespachoResponse } from '../../model/despacho-response';
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
  nuevoDespacho: IDespachoRequest = { idPedidoVenta: 0, fechaProgramada: '', estado: 'Pendiente' };
  estadoFiltro: string = '';
  loading = false;
  error = '';

  constructor(
    private despachoService: DespachoService
  ) {}

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
    this.despachoService.listarTodos().subscribe({
      next: data => this.despachos = data,
      error: () => this.despachos = []
    });
  }

  seleccionarPedidoParaDespacho(pedido: IPedidoVentaResponse) {
    this.nuevoDespacho.idPedidoVenta = pedido.idPedidoVenta;
  }

  programarDespacho() {
    if (!this.nuevoDespacho.idPedidoVenta || !this.nuevoDespacho.fechaProgramada) {
      this.error = 'Completa todos los campos para programar un despacho';
      return;
    }
    this.despachoService.programar(this.nuevoDespacho).subscribe({
      next: () => {
        this.cargarDespachos();
        this.cargarPedidosSinDespacho();
        this.nuevoDespacho = { idPedidoVenta: 0, fechaProgramada: '', estado: 'Pendiente' };
        this.error = '';
      },
      error: () => {
        this.error = 'Error al programar despacho';
      }
    });
  }

}