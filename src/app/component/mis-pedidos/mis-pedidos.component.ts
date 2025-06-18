import { Component, OnInit } from '@angular/core';
import { PedidoVentaService } from '../../service/pedido-venta.service';
import { AuthService } from '../../service/auth.service';
import { IPedidoVentaResponse } from '../../model/pedido-venta-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-pedidos',
  imports: [CommonModule],
  templateUrl: './mis-pedidos.component.html',
  styleUrl: './mis-pedidos.component.css'
})

export class MisPedidosComponent implements OnInit {
  pedidos: IPedidoVentaResponse[] = [];
  loading = true;
  error = '';

  constructor(private pedidoVentaService: PedidoVentaService, private authService: AuthService) {}

  ngOnInit(): void {
    const userInfo: any = this.authService.getUserInfo();
    if (!userInfo || !userInfo.idUsuario) {
      this.error = 'No se pudo obtener el usuario logueado.';
      this.loading = false;
      return;
    }
    // Obtener idCliente a partir de idUsuario
    this.authService.findClienteByUserId(userInfo.idUsuario).subscribe({
      next: (cliente: any) => {
        if (!cliente || !cliente.idCliente) {
          this.error = 'No se pudo obtener el cliente logueado.';
          this.loading = false;
          return;
        }
        this.pedidoVentaService.getPedidosPorCliente(cliente.idCliente).subscribe({
          next: (data) => {
            this.pedidos = data;
            this.loading = false;
          },
          error: () => {
            this.error = 'Error al cargar pedidos';
            this.loading = false;
          }
        });
      },
      error: () => {
        this.error = 'No se pudo obtener el cliente logueado.';
        this.loading = false;
      }
    });
  }
}