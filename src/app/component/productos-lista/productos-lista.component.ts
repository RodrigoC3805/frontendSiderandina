import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../service/producto.service';
import { IProductoResponse } from '../../model/producto-response';

@Component({
  selector: 'app-productos-lista',
  standalone: true, // <-- AGREGA ESTO SI NO ESTÁ
  imports: [CommonModule], // <-- AGREGA ESTO
  templateUrl: './productos-lista.component.html',
  styleUrls: ['./productos-lista.component.css']
})
export class ProductosListaComponent {
  productos: IProductoResponse[] = [];
  @Input() categoriaId: number | null = null;

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
}