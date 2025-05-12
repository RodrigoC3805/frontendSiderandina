import { Component } from '@angular/core';
import { PedidoCompraService } from '../../service/pedido-compra.service';
import { IPedidoCompraResponse } from '../../model/pedido-compra-response';
import { IProveedor } from '../../model/proveedor';
import { ProveedorService } from '../../service/proveedor.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import Swal from 'sweetalert2';
import { ComprobanteCompraService } from '../../service/comprobante-compra.service';
import { IComprobanteCompraResponse } from '../../model/comprobante-compra-response';
import { EstadoDetalleCompraService } from '../../service/estado-detalle-compra.service';
import { IDetalleCompraResponse } from '../../model/detalle-compra-response';
import { DetalleCompraService } from '../../service/detalle-compra.service';

@Component({
  selector: 'app-realizar-compra',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgxPaginationModule],
  templateUrl: './realizar-compra.component.html',
  styleUrl: './realizar-compra.component.css',
  providers: [PedidoCompraService, ProveedorService, ComprobanteCompraService, DetalleCompraService, EstadoDetalleCompraService]
})
export class RealizarCompraComponent {
  vistaActual: 'lista-pedidos' | 'realizar-compra' = 'lista-pedidos';
  pedidoCompraArray: IPedidoCompraResponse[] = [];
  proveedorArray: IProveedor[] = [];
  comprobanteCompraAlert: IComprobanteCompraResponse = {} as IComprobanteCompraResponse;
  detalleCompraAlert: IDetalleCompraResponse[] = [];
  page: number = 1;
  
  constructor(
    private pedidoCompraService: PedidoCompraService,
    private proveedorService: ProveedorService,
    private comprobanteCompraService: ComprobanteCompraService,
    private detalleCompraService: DetalleCompraService
  ) { }
  
  ngOnInit(): void{
    this.getPedidosCompra();
    this.getProveedores();
  }
  
  getPedidosCompra(): void {
    this.pedidoCompraService.getPedidosCompra().subscribe((result: any) => {
      this.pedidoCompraArray = result;
      console.log(this.pedidoCompraArray);
    });
  }
  
  getProveedores(): void{
    this.proveedorService.getProveedor().subscribe((result: any) => {
      this.proveedorArray = result;
      console.log(this.proveedorArray);
    });
  }

  // Función auxiliar para formatear fechas
  formatDateTime(dateString: string | undefined): string {
    if (!dateString) return '-';
    
    try {
      const date = new Date(dateString);
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return dateString;
    }
  }
  
  showComprobanteCompra(idPedido: number): void{
    // Mostrar SweetAlert de carga
    Swal.fire({
      title: 'Cargando comprobante...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Limpiar el comprobante anterior
    this.comprobanteCompraAlert = {} as IComprobanteCompraResponse;
    
    // Obtener datos del comprobante y esperar a que se completen
    this.comprobanteCompraService.getComprobanteCompraByPedidoId(idPedido).subscribe({
      next: (result: any) => {
        this.comprobanteCompraAlert = result;
        console.log(this.comprobanteCompraAlert);
        
        // Una vez que los datos estén disponibles, mostrar el comprobante
        this.displayComprobanteAlert(idPedido);
      },
      error: (error) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar el comprobante. Intente nuevamente.'
        });
        console.error('Error al cargar el comprobante:', error);
      }
    });
  }
  
  displayComprobanteAlert(idPedido: number): void {
    let nombreProveedor = '';
    const pedido = this.pedidoCompraArray.find(p => p.idPedidoCompra === idPedido);
    if (pedido && pedido.proveedor) {
      nombreProveedor = `${pedido.proveedor.razonSocial || ''}`;
    }
    
    Swal.fire({
      html: `
      <style>
        .comprobante-header {
            text-align: center;
            font-weight: bold;
            font-size: 1.2em;
            margin-bottom: 20px;
        }
        .comprobante-content {
            width: 100%;
        }
        .comprobante-row {
            display: flex;
            margin-bottom: 10px;
            align-items: baseline;
        }
        .comprobante-label {
            font-weight: bold;
            width: 40%;
            text-align: left;
        }
        .comprobante-value {
            width: 60%;
            text-align: right;
        }
      </style>
      <div class="comprobante-header">
          Comprobante
      </div>
      
      <div class="comprobante-content">
          <div class="comprobante-row">
              <div class="comprobante-label">N° Comprobante:</div>
              <div class="comprobante-value">${this.comprobanteCompraAlert.numeroComprobante || '-'}</div>
          </div>
          
          <div class="comprobante-row">
              <div class="comprobante-label">Tipo:</div>
              <div class="comprobante-value">${this.comprobanteCompraAlert.tipoComprobante?.descripcion || '-'}</div>
          </div>
          
          <div class="comprobante-row">
              <div class="comprobante-label">Fecha emisión:</div>
              <div class="comprobante-value">${this.formatDateTime(this.comprobanteCompraAlert.fechaEmision)}</div>
          </div>
          
          <div class="comprobante-row">
              <div class="comprobante-label">Código de Compra:</div>
              <div class="comprobante-value">${idPedido}</div>
          </div>
          
          <div class="comprobante-row">
              <div class="comprobante-label">Proveedor:</div>
              <div class="comprobante-value">${nombreProveedor || '-'}</div>
          </div>
          
          <div class="comprobante-row">
              <div class="comprobante-label">Método de pago:</div>
              <div class="comprobante-value">${this.comprobanteCompraAlert.pago?.metodoPago?.descripcion || '-'}</div>
          </div>
          
          <div class="comprobante-row">
              <div class="comprobante-label">Monto pagado (S/.):</div>
              <div class="comprobante-value">${this.comprobanteCompraAlert.pago?.montoPagado || '-'}</div>
          </div>
      </div>
      `,
    });
  }
  
  getComprobanteCompra(idPedido: number): void {
    this.comprobanteCompraService.getComprobanteCompraByPedidoId(idPedido).subscribe((result: any) => {
      this.comprobanteCompraAlert = result;
      console.log(this.comprobanteCompraAlert);
    });
  }
  
  getDetalleCompra(idPedido: number): void{
    this.detalleCompraService.getDetalleComprabyCompraId(idPedido).subscribe((result: any) => {
      this.detalleCompraAlert = result;
      console.log(this.detalleCompraAlert);
    });
  }
  
  showDetallePedido(idPedido: number): void{
    // Mostrar SweetAlert de carga
    Swal.fire({
      title: 'Cargando detalle del pedido...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    // Limpiar el detalle anterior
    this.detalleCompraAlert = [];
    
    // Obtener datos del detalle y esperar a que se completen
    this.detalleCompraService.getDetalleComprabyCompraId(idPedido).subscribe({
      next: (result: any) => {
        this.detalleCompraAlert = result;
        console.log(this.detalleCompraAlert);
        
        // Una vez que los datos estén disponibles, mostrar el detalle
        this.displayDetalleAlert(idPedido);
      },
      error: (error) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar el detalle. Intente nuevamente.'
        });
        console.error('Error al cargar el detalle:', error);
      }
    });
  }
  
  displayDetalleAlert(idPedido: number): void {
    // Calcular el total del pedido
    let totalPedido = 0;
    this.detalleCompraAlert.forEach(detalle => {
      if (detalle.cantidad && detalle.montoSubtotalLinea) {
        totalPedido += detalle.cantidad * detalle.producto?.costoUnitarioBase;
      }
    });
    
    // Buscar información del pedido y proveedor
    let fechaPedido = '';
    let nombreProveedor = '';
    let rucProveedor = '';
    
    const pedido = this.pedidoCompraArray.find(p => p.idPedidoCompra === idPedido);
    if (pedido) {
      fechaPedido = this.formatDateTime(pedido.fechaPedido);
      
      if (pedido.proveedor) {
        nombreProveedor = pedido.proveedor.razonSocial || '';
        rucProveedor = pedido.proveedor.ruc || '';
      }
    }
    
    // Construir las filas de los detalles
    let detallePedidoRows = '';
    this.detalleCompraAlert.forEach((detalle, index) => {
      // Accedemos al nombre del producto directamente
      detallePedidoRows += `
        <tr>
          <td>${index + 1}</td>
          <td>${detalle.producto?.nombre || '-'}</td>
          <td>${detalle.cantidad || 0}</td>
          <td>S/. ${detalle.producto?.costoUnitarioBase.toFixed(2) || '0.00'}</td>
          <td>S/. ${((detalle.cantidad || 0) * (detalle.producto?.costoUnitarioBase || 0)).toFixed(2)}</td>
        </tr>
      `;
    });
    
    // Si no hay detalles, mostrar mensaje
    if (this.detalleCompraAlert.length === 0) {
      detallePedidoRows = `
        <tr>
          <td colspan="5" style="text-align: center;">No hay detalles disponibles para este pedido</td>
        </tr>
      `;
    }
    
    // Mostrar el SweetAlert con los detalles
    Swal.fire({
      title: `Detalle del Pedido #${idPedido}`,
      width: '800px',
      html: `
      <style>
        .detalle-pedido-container {
          width: 100%;
          font-family: Arial, sans-serif;
        }
        .detalle-cabecera {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          padding: 10px;
          background-color: #f9f9f9;
          border-radius: 5px;
        }
        .cabecera-grupo {
          flex: 1;
        }
        .cabecera-titulo {
          font-weight: bold;
          margin-bottom: 5px;
        }
        .tabla-detalle {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        .tabla-detalle th, .tabla-detalle td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        .tabla-detalle th {
          background-color: #f2f2f2;
        }
        .tabla-detalle tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .tabla-footer {
          text-align: right;
          font-weight: bold;
          padding: 10px;
          background-color: #f2f2f2;
          border-radius: 5px;
        }
      </style>
      
      <div class="detalle-pedido-container">
        <div class="detalle-cabecera">
          <div class="cabecera-grupo">
            <div class="cabecera-titulo">Información del Pedido</div>
            <div>Número: ${idPedido}</div>
            <div>Fecha: ${fechaPedido}</div>
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
              <th>Precio Unit.</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${detallePedidoRows}
          </tbody>
        </table>
        
        <div class="tabla-footer">
          Total: S/. ${totalPedido.toFixed(2)}
        </div>
      </div>
      `,
      showCloseButton: true,
      confirmButtonText: 'Cerrar'
    });
  }
}