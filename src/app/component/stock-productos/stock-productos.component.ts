import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IProductoResponse } from '../../model/producto-response';
import { ProductoService } from '../../service/producto.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stock-productos.component.html',
  styleUrls: ['./stock-productos.component.css']
})
export class StockProductosComponent implements OnInit {
  productos: IProductoResponse[] = [];

  // Paginación
  paginaActual = 1;
  productosPorPagina = 5;

   textoBusqueda = ''; 

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
      this.paginaActual = 1;
    });
  }

  buscar(): void {
    if (!this.textoBusqueda.trim()) {
      this.cargarProductos();
      return;
    }
    this.productoService.buscarProductosPorNombre(this.textoBusqueda.trim()).subscribe({
      next: data => {
        this.productos = data;
        this.paginaActual = 1;
      },
      error: () => {
        this.productos = [];
        this.paginaActual = 1;
      }
    });
  }

  limpiarBusqueda(): void {
    this.textoBusqueda = '';
    this.cargarProductos();
  }

  get productosPaginados(): IProductoResponse[] {
    const inicio = (this.paginaActual - 1) * this.productosPorPagina;
    return this.productos.slice(inicio, inicio + this.productosPorPagina);
  }

  get totalPaginas(): number {
    return Math.ceil(this.productos.length / this.productosPorPagina);
  }

  cambiarPagina(pagina: number) {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  

}