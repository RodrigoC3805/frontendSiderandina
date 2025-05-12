import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../service/producto.service';
import { IProductoResponse } from '../../model/producto-response';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productos-lista',
  standalone: true, 
  imports: [CommonModule, NgxPaginationModule, RouterModule], // Agrega NgbPaginationModule aquí
  templateUrl: './productos-lista.component.html',
  styleUrls: ['./productos-lista.component.css']
})
export class ProductosListaComponent {
  productos: IProductoResponse[] = [];
  @Input() categoriaId: number | null = null;

  // Variables para paginación
  page = 1;
  pageSize = 9; // 3 filas de 3 productos

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.cargarProductos();
  }

  ngOnChanges() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe(data => {
      console.log('productos:', data);
      this.productos = this.categoriaId
        ? data.filter(p => p.categorioProducto?.idCatProd === this.categoriaId)
        : data;
    });
  }

  get productosPaginados(): IProductoResponse[] {
    const start = (this.page - 1) * this.pageSize;
    return this.productos.slice(start, start + this.pageSize);
  }
}