import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../service/producto.service';
import { IProductoResponse } from '../../model/producto-response';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-productos-lista',
  standalone: true, 
  imports: [CommonModule, NgxPaginationModule, RouterModule], // Agrega NgbPaginationModule
  templateUrl: './productos-lista.component.html',
  styleUrls: ['./productos-lista.component.css']
})
export class ProductosListaComponent {
  productos: IProductoResponse[] = [];
  @Input() categoriaId: number | null = null;

  // Variables para paginación
  page = 1;
  pageSize = 9; 

  constructor(private productoService: ProductoService) {}

  // Al inicializar el componente, carga los productos
  ngOnInit() {
    this.cargarProductos();
  }

  // Cuando cambia la categoría seleccionada, recarga los productos filtrados
  ngOnChanges() {
    this.cargarProductos();
  }

  // Carga productos desde el backend y filtra por categoría si corresponde
  cargarProductos() {
    this.productoService.getProductos().subscribe(data => {
      console.log('productos:', data);
      this.productos = this.categoriaId
        ? data.filter(p => p.categorioProducto?.idCatProd === this.categoriaId)
        : data;
    });
  }

  // Devuelve los productos de la página actual para la paginación
  get productosPaginados(): IProductoResponse[] {
    const start = (this.page - 1) * this.pageSize;
    return this.productos.slice(start, start + this.pageSize);
  }
}