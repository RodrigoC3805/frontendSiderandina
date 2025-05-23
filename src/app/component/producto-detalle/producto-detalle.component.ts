import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService } from '../../service/producto.service';
import { IProductoResponse } from '../../model/producto-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.css']
})
export class ProductoDetalleComponent implements OnInit {
  producto?: IProductoResponse;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    // Obtiene el ID del producto desde la URL
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // Busca el producto por ID en la lista obtenida del backend
    this.productoService.getProductos().subscribe(productos => {
      this.producto = productos.find(p => p.idProducto === id);
    });
  }

   // vuelveee a la lista de productos
  volver(): void {
    this.router.navigate(['/productos']);
  }
}