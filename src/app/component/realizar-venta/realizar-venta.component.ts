import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../service/producto.service';
import { IProductoResponse } from '../../model/producto-response';
import { CotizacionService } from '../../service/cotizacion.service';
import { ICotizacionRequest } from '../../model/cotizacion-request';

interface ItemCarrito {
  producto: IProductoResponse;
  cantidad: number;
}

@Component({
  selector: 'app-realizar-venta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './realizar-venta.component.html',
  styleUrls: ['./realizar-venta.component.css']
})
export class RealizarVentaComponent implements OnInit {
  productos: IProductoResponse[] = [];
  cantidades: { [id: number]: number } = {};
  carrito: ItemCarrito[] = [];

  // Notificación
  notificacionVisible = false;
  notificacionMensaje = '';

  carritoVisible = false;

  constructor(
    private productoService: ProductoService,
    private cotizacionService: CotizacionService
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => this.productos = data,
      error: () => {
        this.notificacionMensaje = 'No se pudo cargar la lista de productos';
        this.notificacionVisible = true;
        setTimeout(() => this.notificacionVisible = false, 2000);
      }
    });
  }

  agregarAlCarrito(producto: IProductoResponse) {
    const cantidad = this.cantidades[producto.idProducto] ?? 1;
    if (cantidad < 1) return;

    const item = this.carrito.find(i => i.producto.idProducto === producto.idProducto);
    if (item) {
      item.cantidad += cantidad;
    } else {
      this.carrito.push({ producto, cantidad });
    }
    this.cantidades[producto.idProducto] = 1;
  }

  quitarDelCarrito(producto: IProductoResponse) {
    this.carrito = this.carrito.filter(i => i.producto.idProducto !== producto.idProducto);
  }

  estaEnCarrito(producto: IProductoResponse): boolean {
    return this.carrito.some(i => i.producto.idProducto === producto.idProducto);
  }

  getTotalCarrito(): number {
    return this.carrito.reduce((acc, i) => acc + (i.producto.precioVentaBase || 0) * i.cantidad, 0);
  }

  solicitarCotizacion() {
    const idCliente = 1; // O el id real del cliente logueado

    const detalles = this.carrito
      .filter(item => item.cantidad > 0 && item.producto.stock >= item.cantidad)
      .map(item => ({
        idProducto: item.producto.idProducto,
        cantidad: item.cantidad
      }));

    if (detalles.length === 0) {
      this.notificacionMensaje = 'No hay productos válidos para cotizar';
      this.notificacionVisible = true;
      setTimeout(() => this.notificacionVisible = false, 2000);
      return;
    }

    const cotizacion: ICotizacionRequest = {
      idCliente,
      detalles
    };

    this.cotizacionService.crearCotizacion(cotizacion).subscribe({
      next: (resp) => {
        this.notificacionMensaje = 'Cotización enviada correctamente';
        this.notificacionVisible = true;
        setTimeout(() => this.notificacionVisible = false, 2000);
        this.carrito = [];
      },
      error: () => {
        this.notificacionMensaje = 'Error al enviar la cotización';
        this.notificacionVisible = true;
        setTimeout(() => this.notificacionVisible = false, 2000);
      }
    });
  }
}