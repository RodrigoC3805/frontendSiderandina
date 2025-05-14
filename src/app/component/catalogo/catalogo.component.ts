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
    // ID de la categoría seleccionada, o null si no hay selección
  categoriaSeleccionada: number | null = null;
  @ViewChild('productosLista') productosLista?: ProductosListaComponent;

    // Retorna true si la lista de productos está en la primera página
  esPrimeraPagina(): boolean {
    return !this.productosLista || this.productosLista.page === 1;
  }
}