import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaProductoService } from '../../service/categoria-producto.service';
import { ICategoriaProducto } from '../../model/categoria-producto';

@Component({
  selector: 'app-categorias-sidebar',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './categorias-sidebar.component.html',
  styleUrls: ['./categorias-sidebar.component.css']
})
export class CategoriasSidebarComponent {
  // Lista de categorías obtenidas del backend  
  categorias: ICategoriaProducto[] = []; 
  // Emite el ID de la categoría seleccionada o null para "todas"
  @Output() categoriaSeleccionada = new EventEmitter<number | null>();

  constructor(private categoriaService: CategoriaProductoService) {}

  // Al inicializar el componente, obtiene las categorías del backend
  ngOnInit() {
    this.categoriaService.getCategoriasProducto().subscribe(data => {
      this.categorias = data;
    });
  }

  // Emite el ID de la categoría seleccionada al componente padre
  seleccionarCategoria(id: number | null) {
    this.categoriaSeleccionada.emit(id);
  }
}