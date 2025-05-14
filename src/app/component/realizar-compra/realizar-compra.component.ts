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
import { ProductoService } from '../../service/producto.service';
import { IProductoResponse } from '../../model/producto-response';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { IDetalleCompraRequest } from '../../model/detalle-compra-request';
import { IMetodoPago } from '../../model/metodo-pago';
import { MetodoPagoService } from '../../service/metodo-pago.service';
import { ICompra } from '../../model/compra';

@Component({
  selector: 'app-realizar-compra',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgxPaginationModule],
  templateUrl: './realizar-compra.component.html',
  styleUrl: './realizar-compra.component.css',
  providers: [PedidoCompraService, ProveedorService, ComprobanteCompraService, DetalleCompraService, EstadoDetalleCompraService, ProductoService]
})
export class RealizarCompraComponent {
  vistaActual: 'lista-pedidos' | 'realizar-compra' | 'registrar-pago' = 'lista-pedidos';
  pedidoCompraArray: IPedidoCompraResponse[] = [];
  proveedorArray: IProveedor[] = [];
  productoArray: IProductoResponse[] = [];
  metodoPagoArray: IMetodoPago[] = [];
  productosSeleccionadosArray: IProductoResponse[] = [];
  detalleSeleccionadoArray: IDetalleCompraResponse[] = [];
  comprobanteCompraAlert: IComprobanteCompraResponse = {} as IComprobanteCompraResponse;
  detalleCompraAlert: IDetalleCompraResponse[] = [];
  page: number = 1;
  proveedorSeleccionado: IProveedor = {} as IProveedor;
  metodoPagoSeleccionado: IMetodoPago = {} as IMetodoPago;
  compraForm: FormGroup;
  totalCompra: number;
  constructor(
    private pedidoCompraService: PedidoCompraService,
    private proveedorService: ProveedorService,
    private comprobanteCompraService: ComprobanteCompraService,
    private detalleCompraService: DetalleCompraService,
    private productoService: ProductoService,
    private metodoPagoService: MetodoPagoService
  ) {
    this.compraForm = new FormGroup({
      proveedor: new FormControl('', [Validators.required]),
      metodoPago: new FormControl('', [Validators.required])
    });
   }
  
  ngOnInit(): void{
    this.getPedidosCompra();
    this.getProveedores();
    this.getProductos();
    this.getMetodoPago();
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
  getProductos(): void {
    this.productoService.getProductos().subscribe((result: any) => {
      this.productoArray = result;
      console.log(this.pedidoCompraArray);
    });
  }
  getMetodoPago(): void {
    this.metodoPagoService.getMetodosPago().subscribe((result: any) => {
      this.metodoPagoArray = result;
      console.log(this.metodoPagoArray);
    })
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
        this.mostrarError('No se pudo cargar el comprobante. Intente nuevamente.');
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
        this.mostrarError('No se pudo cargar el detalle.Intente nuevamente.');
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
  irARealizarCompra(): void{
    this.compraForm.reset();
    this.clearCantidad();
    this.productosSeleccionadosArray.forEach(p => this.removeSeleccionado(p));
    this.vistaActual = 'realizar-compra';
  }
  irARegistrarPago(): void{
    if (this.validarPedido()) {
      this.vistaActual = 'registrar-pago';
      this.calcularTotal();
    }
  }
  volverAListaPedidos() {
    this.vistaActual = 'lista-pedidos';
  }
  addSeleccionado(producto: IProductoResponse): void{
    this.productosSeleccionadosArray.push(producto);
    const index = this.productoArray.findIndex(p => p.idProducto === producto.idProducto);
    if (index !== -1) {
      this.productoArray.splice(index, 1);
    }
    let detalleCompra: IDetalleCompraResponse = {} as IDetalleCompraResponse;
    detalleCompra.producto = producto;
    detalleCompra.cantidad = 0;
    detalleCompra.cantidadRecibida = null;
    detalleCompra.montoSubtotalLinea = 0;
    this.detalleSeleccionadoArray.push(detalleCompra);
  }
  removeSeleccionado(producto: IProductoResponse): void {   
    this.productoArray.push(producto);
    
    const indexProd = this.productosSeleccionadosArray.findIndex(p => p.idProducto === producto.idProducto);
    if (indexProd !== -1) {
      this.productosSeleccionadosArray.splice(indexProd, 1);
    }
    console.log(this.productoArray);
    const indexDetalle = this.detalleSeleccionadoArray.findIndex(p => p.producto.idProducto === producto.idProducto);
    if (indexDetalle !== -1) {
      this.detalleSeleccionadoArray.splice(indexDetalle, 1);
    }
    console.log(this.productoArray);
  }
  setCantidad(event: Event, productoId: number): void {
    const inputChangeValue = (event.target as HTMLInputElement).value;
    const index = this.detalleSeleccionadoArray.findIndex(d => d.producto.idProducto === productoId);
    if (index !== -1) {
      this.detalleSeleccionadoArray[index].cantidad = Number(inputChangeValue);
      this.detalleSeleccionadoArray[index].montoSubtotalLinea = Number(inputChangeValue)*this.detalleSeleccionadoArray[index].producto.costoUnitarioBase;
      console.log(this.detalleSeleccionadoArray);
    }
  }
  clearCantidad(): void{
    this.detalleSeleccionadoArray.forEach(d => d.cantidad = 0);
    this.calcularTotal();
  }
  calcularTotal(): void{
    this.totalCompra = 0;
    for (const d of this.detalleSeleccionadoArray) {
      this.totalCompra += d.montoSubtotalLinea;
    }
  }
  pagar(): void{
    if (this.validarPago()) {
      const pedidoCompra = {
        montoTotal: this.totalCompra,
        fechaPedido: new Date().toISOString(), // Fecha actual en formato ISO
        estadoPedido: {
          idEstadoPedido: 1 // ID del estado inicial
        },
        proveedor: {
          idProveedor: this.proveedorSeleccionado.idProveedor // ID del proveedor
        }
      };   
      // Crear la lista de detallesCompra con la estructura correcta
      const detallesCompra = this.detalleSeleccionadoArray;
      // Crear el objeto comprobanteCompra con solo las propiedades necesarias
      const comprobanteCompra = {
        fechaEmision: new Date().toISOString(), // Fecha actual en formato ISO
        idTipoComprobante: 1 // ID del tipo de comprobante seleccionado
      };
    
      // Crear el objeto pago con solo las propiedades necesarias
      const pago = {
        montoPagado: this.totalCompra,
        metodoPago: {
          idMetodoPago: this.metodoPagoSeleccionado.idMetodoPago// ID del método de pago seleccionado
        }
      };
    
      // Construir el objeto final con la estructura requerida
      const compra = {
        pedidoCompra,
        detallesCompra,
        comprobanteCompra,
        pago
      };  
      console.log(compra);
      this.pedidoCompraService.realizarCompra(compra).subscribe(
        (result: any) => {
          this.ngOnInit();
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Pago registrado',
            text: 'Se registró exitosamente la compra',
          });
          this.volverAListaPedidos();
        },
        (err: any) => {
          Swal.close();
          Swal.fire({
            icon: 'error',
            title: 'Advertencia...',
            text: 'Ocurrió un error al registrar la compra',
          });
        }
      )
    }
  }
  setProveedor(event: Event): void {
    const inputChangeValue = (event.target as HTMLInputElement).value;
    const index = this.proveedorArray.findIndex(p => p.idProveedor === Number(inputChangeValue));
    if (index !== -1) {
      this.proveedorSeleccionado = this.proveedorArray.at(index);
    }
    this.compraForm.controls['proveedor'].setValue(inputChangeValue);
  }
  setMetodoPago(event: Event): void {
    const inputChangeValue = (event.target as HTMLInputElement).value;
    const index = this.metodoPagoArray.findIndex(m => m.idMetodoPago === Number(inputChangeValue));
    if (index !== -1) {
      this.metodoPagoSeleccionado = this.metodoPagoArray.at(index);
    }
    this.compraForm.controls['metodoPago'].setValue(inputChangeValue);
  }
  validarPedido(): boolean {
    if (this.compraForm.get('proveedor')?.hasError('required')) {
      this.mostrarError('Seleccione un proveedor');
      return false;
    }
    if (this.productosSeleccionadosArray.length == 0) {
      this.mostrarError('Seleccione al menos un producto para comprar');
      return false;
    } 
    const index = this.detalleSeleccionadoArray.findIndex(d => d.cantidad <= 0);
    if (index !== -1) {
      this.mostrarError('No se puede solicitar productos con cantidad 0');
      return false;
    }
    return true;
  }
  validarPago(): boolean {
    if (this.compraForm.get('metodoPago')?.hasError('required')) {
      this.mostrarError('Seleccione un método de pago');
      return false;
    }
    return true;
  }
  mostrarError(tipo: string): void{
    Swal.close();
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: tipo
    });
  }
}