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
@Component({
  selector: 'app-realizar-compra',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgxPaginationModule],
  templateUrl: './realizar-compra.component.html',
  styleUrl: './realizar-compra.component.css',
  providers: [PedidoCompraService, ProveedorService, ComprobanteCompraService]
})
export class RealizarCompraComponent {
  pedidoCompraArray: IPedidoCompraResponse[] = [];
  proveedorArray: IProveedor[] = [];
  comprobanteCompraAlert: IComprobanteCompraResponse = {} as IComprobanteCompraResponse;
  page: number = 1;
  
  constructor(
    private pedidoCompraService: PedidoCompraService,
    private proveedorService: ProveedorService,
    private comprobanteCompraService: ComprobanteCompraService
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
              <div class="comprobante-value">${this.comprobanteCompraAlert.fechaEmision || '-'}</div>
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
              <div class="comprobante-value">${ this.comprobanteCompraAlert.pago.metodoPago?.descripcion }</div>
          </div>
          
          <div class="comprobante-row">
              <div class="comprobante-label">Monto pagado (S/.):</div>
              <div class="comprobante-value">${ this.comprobanteCompraAlert.pago?.montoPagado }</div>
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
}