import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaProductoService } from '../../service/categoria-producto.service';
import { ICategoriaProducto } from '../../model/categoria-producto';

@Component({
  selector: 'app-categorias-sidebar',
  standalone: true, // <-- AGREGA ESTO SI NO ESTÁ
  imports: [CommonModule], // <-- AGREGA ESTO
  templateUrl: './categorias-sidebar.component.html',
  styleUrls: ['./categorias-sidebar.component.css']
})
export class CategoriasSidebarComponent {
  categorias: ICategoriaProducto[] = [];
  @Output() categoriaSeleccionada = new EventEmitter<number | null>();

  constructor(private categoriaService: CategoriaProductoService) {}

  ngOnInit() {
    this.categoriaService.getCategoriasProducto().subscribe(data => {
      this.categorias = data;
    });
  }

  seleccionarCategoria(id: number | null) {
    this.categoriaSeleccionada.emit(id);
  }
}