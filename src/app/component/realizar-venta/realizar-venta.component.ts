import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
}

interface ItemCarrito {
  producto: Producto;
  cantidad: number;
}

@Component({
  selector: 'app-realizar-venta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './realizar-venta.component.html',
  styleUrls: ['./realizar-venta.component.css']
})
export class RealizarVentaComponent {
  productos: Producto[] = [
    { id: 1, nombre: 'Cinta métrica x 3m 13mm', descripcion: 'Herramienta de medición precisa.', precio: 5.00 },
    { id: 2, nombre: 'Hoja de sierra', descripcion: 'Hoja de sierra para corte de madera.', precio: 15.00 },
    { id: 3, nombre: 'Martillo', descripcion: 'Martillo de acero forjado.', precio: 18.00 },
    { id: 4, nombre: 'Destornillador', descripcion: 'Destornillador de punta plana.', precio: 7.50 }
  ];

  cantidades: { [id: number]: number } = {};
  carrito: ItemCarrito[] = [];

  // Notificación
  notificacionVisible = false;
  notificacionMensaje = '';

  agregarAlCarrito(producto: Producto) {
    const cantidad = this.cantidades[producto.id] ?? 1;
    if (cantidad < 1) return;

    const item = this.carrito.find(i => i.producto.id === producto.id);
    if (item) {
      item.cantidad += cantidad;
    } else {
      this.carrito.push({ producto, cantidad });
    }
    this.cantidades[producto.id] = 1;
  }

  quitarDelCarrito(producto: Producto) {
    this.carrito = this.carrito.filter(i => i.producto.id !== producto.id);
  }

  estaEnCarrito(producto: Producto): boolean {
    return this.carrito.some(i => i.producto.id === producto.id);
  }

  getTotalCarrito(): number {
    return this.carrito.reduce((acc, i) => acc + i.producto.precio * i.cantidad, 0);
  }

  solicitarCotizacion() {
    this.notificacionMensaje = 'Solicitando cotización...';
    this.notificacionVisible = true;
    setTimeout(() => {
      this.notificacionVisible = false;
    }, 2000);
  }
}