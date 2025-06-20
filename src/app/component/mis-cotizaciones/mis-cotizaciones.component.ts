import { Component, OnInit } from '@angular/core';
import { CotizacionService } from '../../service/cotizacion.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { PedidoVentaService } from '../../service/pedido-venta.service';
import { IPedidoVentaRequest } from '../../model/pedido-venta-request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mis-cotizaciones',
  imports: [CommonModule],
  templateUrl: './mis-cotizaciones.component.html',
  styleUrls: ['./mis-cotizaciones.component.css']
})

export class MisCotizacionesComponent implements OnInit {
  cotizaciones: any[] = [];
  loading = true;
  error = '';

  constructor(
    private cotizacionService: CotizacionService,
    private authService: AuthService,
    private pedidoVentaService: PedidoVentaService
  ) {}

  ngOnInit(): void {
    const userInfo: any = this.authService.getUserInfo();
    if (!userInfo || !userInfo.idUsuario) {
      this.error = 'No se pudo obtener el usuario logueado.';
      this.loading = false;
      return;
    }
    this.authService.findClienteByUserId(userInfo.idUsuario).subscribe({
      next: (cliente: any) => {
        if (!cliente || !cliente.idCliente) {
          this.error = 'No se pudo obtener el cliente logueado.';
          this.loading = false;
          return;
        }
        this.cotizacionService.getCotizacionesPorCliente(cliente.idCliente).subscribe({
          next: (data) => {
            this.cotizaciones = data;
            this.loading = false;
          },
          error: () => {
            this.error = 'Error al cargar cotizaciones';
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
  
  mostrarDetalles(index: number): void {
    const cotizacion = this.cotizaciones[index];
    let detalleRows = '';
    cotizacion.detalles.forEach((detalle: any, idx: number) => {
      detalleRows += `
        <tr>
          <td>${idx + 1}</td>
          <td>${detalle.producto?.nombre || '-'}</td>
          <td>${detalle.cantidad}</td>
          <td>${detalle.precioCotizado?.toFixed(2) || '-'}</td>
          <td>${detalle.montoSubtotalLinea?.toFixed(2) || '-'}</td>
        </tr>
      `;
    });

    Swal.fire({
      title: `Detalle de Cotización: ${cotizacion.codigoCotizacion}`,
      width: 700,
      html: `
        <div>
          <b>Fecha:</b> ${new Date(cotizacion.fechaEmision).toLocaleString()}<br>
          <b>Estado:</b> ${cotizacion.estadoCotizacion?.descripcion || '-'}<br>
          
          <hr>
          <table style="width:100%; border-collapse:collapse;">
            <thead>
              <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${detalleRows}
            </tbody>
          </table>
          <hr>
          <b>Monto Total:</b> S/ ${cotizacion.montoTotal?.toFixed(2) || '-'}
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: false,
    });
  }

  abrirModalPedido(cotizacion: any) {
  Swal.fire({
    title: 'Realizar Pedido de Venta',
    html: `
      <div style="text-align:left">
        <b>Código Cotización:</b> ${cotizacion.codigoCotizacion}<br>
        <b>Monto Total:</b> S/ ${cotizacion.montoTotal?.toFixed(2)}<br>
        <b>Dirección de Entrega:</b>
        <input id="direccionEntrega" class="swal2-input" placeholder="Ingrese dirección de entrega">
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: 'Siguiente',
    cancelButtonText: 'Cancelar',
    preConfirm: () => {
      const direccionEntrega = (document.getElementById('direccionEntrega') as HTMLInputElement).value;
      if (!direccionEntrega) {
        Swal.showValidationMessage('Debe ingresar la dirección de entrega');
        return false;
      }
      return { direccionEntrega };
    }
  }).then(result => {
    if (result.isConfirmed) {
      // Segunda ventana de confirmación
      Swal.fire({
        title: '¿Confirmar pedido?',
        text: '¿Está seguro de que desea realizar el pedido?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        width: 350
      }).then(confirmResult => {
        if (confirmResult.isConfirmed) {
          const request: IPedidoVentaRequest = {
            idCotizacion: cotizacion.idCotizacion,
            idEstadoPedido: 1, // Por enviar
            direccionEntrega: result.value.direccionEntrega
          };
          this.pedidoVentaService.crearPedidoVenta(request).subscribe({
            next: (resp) => {
              Swal.fire('Pedido creado', `Código de venta: ${resp.codigoVenta}`, 'success');
            },
            error: () => {
              Swal.fire('Error', 'No se pudo crear el pedido de venta', 'error');
            }
          });
        }
        // Si cancela, no hace nada
      });
    }
  });
}

}

