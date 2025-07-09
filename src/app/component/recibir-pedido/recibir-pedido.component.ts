import { Component } from '@angular/core';
import { PedidoCompraService } from '../../service/pedido-compra.service';
import { IPedidoCompraResponse } from '../../model/pedido-compra-response';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IDetalleCompraResponse } from '../../model/detalle-compra-response';
import Swal from 'sweetalert2';
import { DetalleCompraService } from '../../service/detalle-compra.service';
import { EstadoDetalleCompraService } from '../../service/estado-detalle-compra.service';
import { IEstadoDetalleCompra } from '../../model/estado-detalle-compra';


@Component({
  selector: 'app-recibir-pedido',
  imports: [CommonModule, HttpClientModule, NgxPaginationModule],
  templateUrl: './recibir-pedido.component.html',
  styleUrl: './recibir-pedido.component.css',
})
export class RecibirPedidoComponent {
  pedidoCompraArray: IPedidoCompraResponse[] = [];
  estadosDetalleCompraArray: IEstadoDetalleCompra[] = [];
  detalleCompraArray: IDetalleCompraResponse[] = [];
  page: number = 1;
  constructor(
    private pedidoCompraService: PedidoCompraService,
    private detalleCompraService: DetalleCompraService,
    private estadoDetalleCompraService: EstadoDetalleCompraService
  ) {}

  ngOnInit() {
    this.getPedidosEnviadosYEntregados();
    this.getEstadosDetalleCompra();
  }

  getPedidosEnviadosYEntregados() {
    this.pedidoCompraService
      .getPedidosEnviadosYEntregados()
      .subscribe((result: any) => {
        this.pedidoCompraArray = result;
      });
  }
  getEstadosDetalleCompra() {
    this.estadoDetalleCompraService
      .getEstadosDetalleCompra()
      .subscribe((result: any) => {
        this.estadosDetalleCompraArray = result;
      });
  }
  showDetallePedido(idPedido: number): void {
    // Mostrar SweetAlert de carga
    Swal.fire({
      title: 'Cargando detalle del pedido...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // Limpiar el detalle anterior
    this.detalleCompraArray = [];
    // Obtener datos del detalle y esperar a que se completen
    this.detalleCompraService.getDetalleComprabyCompraId(idPedido).subscribe({
      next: (result: any) => {
        this.detalleCompraArray = result;
        console.log(this.detalleCompraArray);

        // Una vez que los datos estén disponibles, mostrar el detalle
        this.displayDetalleAlert(idPedido);
      },
      error: (error) => {
        this.mostrarError('No se pudo cargar el detalle.Intente nuevamente.');
        console.error('Error al cargar el detalle:', error);
      },
    });
  }
  //HTML de la alerta del Detalle del pedido
  displayDetalleAlert(idPedido: number): void {
    // Buscar información del pedido y proveedor
    let fechaPedido = '';
    let nombreProveedor = '';
    let rucProveedor = '';
    let estadoPedido = '';

    const pedido = this.pedidoCompraArray.find(
      (p) => p.idPedidoCompra === idPedido
    );
    if (pedido) {
      fechaPedido = this.formatDateTime(pedido.fechaPedido);
      estadoPedido = pedido.estadoPedido?.descripcion || '';
      if (pedido.proveedor) {
        nombreProveedor = pedido.proveedor.razonSocial || '';
        rucProveedor = pedido.proveedor.ruc || '';
      }
    }

    // Asegurarse de que cada detalle tenga estado inicial
    this.detalleCompraArray.forEach((detalle) => {
      if (!detalle.estadoDetalleCompra) {
        const estadoInicial = this.estadosDetalleCompraArray.find(
          (e) => e.idEstadoDetalleCompra === 1
        );
        detalle.estadoDetalleCompra = estadoInicial || null;
      }
    });

    // Construir las filas de los detalles con <select>
    let detallePedidoRows = '';
    this.detalleCompraArray.forEach((detalle, index) => {
      const opciones = this.estadosDetalleCompraArray
        .map((estado) => {
          const selected =
            detalle.estadoDetalleCompra?.idEstadoDetalleCompra ===
            estado.idEstadoDetalleCompra
              ? 'selected'
              : '';
          return `<option value="${estado.idEstadoDetalleCompra}" ${selected}>
                  ${estado.descripcion}
                </option>`;
        })
        .join('');

      detallePedidoRows += `
        <tr>
          <td>${index + 1}</td>
          <td>${detalle.producto?.nombre || '-'}</td>
          <td>${detalle.cantidad || 0}</td>
          <td>
            <select class="swal2-input" id="select-estado-${index}">
              ${opciones}
            </select>
          </td>
        </tr>
      `;
    });

    if (this.detalleCompraArray.length === 0) {
      detallePedidoRows = `
        <tr>
          <td colspan="4" style="text-align: center;">
            No hay detalles disponibles para este pedido
          </td>
        </tr>
      `;
    }

    // Mostrar el SweetAlert
    Swal.fire({
      title: `Detalle del Pedido #${idPedido}`,
      width: '800px',
      html: `
        <style>
          .detalle-pedido-container { width: 100%; font-family: Arial, sans-serif; }
          .detalle-cabecera { display: flex; justify-content: space-between; margin-bottom: 20px; padding: 10px; background-color: #f9f9f9; border-radius: 5px; }
          .cabecera-grupo { flex: 1; }
          .cabecera-titulo { font-weight: bold; margin-bottom: 5px; }
          .tabla-detalle { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .tabla-detalle th, .tabla-detalle td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          .tabla-detalle th { background-color: #f2f2f2; }
          .tabla-detalle tr:nth-child(even) { background-color: #f9f9f9; }
        </style>
  
        <div class="detalle-pedido-container">
          <div class="detalle-cabecera">
            <div class="cabecera-grupo">
              <div class="cabecera-titulo">Información del Pedido</div>
              <div>Número: ${idPedido}</div>
              <div>Fecha: ${fechaPedido}</div>
              <div>Estado Pedido: ${estadoPedido}</div>
            </div>
            <div class="cabecera-grupo">
              <div class="cabecera-titulo">Proveedor</div>
              <div>${nombreProveedor || '-'}</div>
              <div>RUC: ${rucProveedor || '-'}</div>
            </div>
          </div>
          
          <table class="tabla-detalle">
            <thead>
              <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              ${detallePedidoRows}
            </tbody>
          </table>        
        </div>
      `,
      showCloseButton: true,
      showCancelButton: false,
      showConfirmButton: estadoPedido === 'Enviado',
      confirmButtonText: 'Guardar',
      preConfirm: () => {
        // Leer selects y actualizar detalleCompraArray
        this.detalleCompraArray.forEach((detalle, index) => {
          const selectedId = (
            document.getElementById(
              `select-estado-${index}`
            ) as HTMLSelectElement
          )?.value;
          const estado = this.estadosDetalleCompraArray.find(
            (e) => e.idEstadoDetalleCompra === Number(selectedId)
          );
          if (estado) {
            detalle.estadoDetalleCompra = estado;
          }
        });

        const invalido = this.detalleCompraArray.some(
          (d) => !d.estadoDetalleCompra
        );
        if (invalido) {
          Swal.showValidationMessage(
            'Todos los detalles deben tener un estado válido.'
          );
          return false;
        }

        // Llamar a tu servicio backend de guardado
        return this.detalleCompraService
          .guardarDetalles(this.detalleCompraArray) // 👈 usa tu método real de guardado
          .toPromise()
          .then(() => true)
          .catch((err: any) => {
            console.error(err);
            Swal.showValidationMessage(
              'Error al guardar los detalles. Intente nuevamente.'
            );
            return false;
          });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Guardado!',
          'Los estados se guardaron correctamente.',
          'success'
        );
      }
    });
  }

  formatDateTime(dateString: string | undefined): string {
    if (!dateString) return '-';

    try {
      const date = new Date(dateString);
      return `${date.getDate().toString().padStart(2, '0')}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}/${date.getFullYear()} ${date
        .getHours()
        .toString()
        .padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return dateString;
    }
  }
  mostrarError(tipo: string): void {
    Swal.close();
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: tipo,
    });
  }
  validarEstados(): boolean {
    return this.detalleCompraArray.every((d) => d.estadoDetalleCompra !== null);
  }
}
