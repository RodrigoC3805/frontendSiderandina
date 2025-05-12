import { Component } from '@angular/core';
import { CategoriasSidebarComponent } from '../categorias-sidebar/categorias-sidebar.component';
import { ProductosListaComponent } from '../productos-lista/productos-lista.component';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CategoriasSidebarComponent, ProductosListaComponent],
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css']
})
export class CatalogoComponent {
  categoriaSeleccionada: number | null = null;
}