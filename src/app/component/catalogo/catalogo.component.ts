import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriasSidebarComponent } from '../categorias-sidebar/categorias-sidebar.component';
import { ProductosListaComponent } from '../productos-lista/productos-lista.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, CategoriasSidebarComponent, ProductosListaComponent],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {
  categoriaSeleccionada: number | null = null;
  @ViewChild('productosLista') productosLista?: ProductosListaComponent;

  esPrimeraPagina(): boolean {
    return !this.productosLista || this.productosLista.page === 1;
  }
}