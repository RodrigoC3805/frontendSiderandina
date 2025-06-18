import { Component, OnInit } from '@angular/core';
import { PedidoVentaService } from '../../service/pedido-venta.service';
import { AuthService } from '../../service/auth.service';
import { IPedidoVentaResponse } from '../../model/pedido-venta-response';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { PagoService } from '../../service/pago.service';

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

  constructor(
    private pedidoVentaService: PedidoVentaService, 
    private authService: AuthService,
    private pagoService: PagoService
  ) {}

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

  mostrarPago(pedido: any) {
    const montoTotal = pedido.montoTotalCotizacion || 0;
    Swal.fire({
      title: 'CULQI CHECKOUT',
      html: `
        <div style="background:#4b3576;padding:20px;border-radius:12px;">
          <img src="https://culqi.com/assets/img/logos/culqi-logo.svg" alt="Culqi" style="width:60px;margin-bottom:10px;">
          <div style="color:white;font-weight:bold;margin-bottom:10px;">CULQI CHECKOUT</div>
          <input id="correoPago" class="swal2-input" placeholder="user@email.com" style="background:#fff;">
          <input id="tarjetaPago" class="swal2-input" placeholder="Número de tarjeta" style="background:#fff;">
          <input id="fechaPago" class="swal2-input" placeholder="MM/AAAA" style="background:#fff;">
          <input id="cvvPago" class="swal2-input" placeholder="CVV" style="background:#fff;">
          <button id="btnPagar" class="swal2-confirm swal2-styled" style="width:100%;margin-top:10px;">
          PAGAR S/ ${montoTotal.toFixed(2)}
        </button>
      </div>
      `,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      didOpen: () => {
        const btn = document.getElementById('btnPagar');
        btn?.addEventListener('click', () => {
          // Aquí puedes validar los campos si lo deseas
          // Por ahora, solo registrar el pago
          const request = {
            idMetodoPago: 1, // Puedes cambiarlo según tu lógica
            montoPagado: montoTotal
          };
          this.pagoService.registrarPago(request).subscribe({
            next: () => {
              Swal.fire('Pago realizado', `El pago de S/ ${montoTotal.toFixed(2)} se registró correctamente.`, 'success');
            },
            error: () => {
              Swal.fire('Error', 'No se pudo registrar el pago', 'error');
            }
          });
        });
      }
    });
  }
}