import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ICategoriaProducto } from '../../model/categoria-producto';
import { CategoriaProductoService } from '../../service/categoria-producto.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [CategoriaProductoService]
})
export class HomeComponent implements OnInit {
  categoriaProductoArray: ICategoriaProducto[] = [];
  
  constructor(
    private categoriaProductoService: CategoriaProductoService
  ) { }
  
  ngOnInit(): void {
    this.getCategoriasProducto();
  }
  
  getCategoriasProducto(): void {
    this.categoriaProductoService.getCategoriasProducto().subscribe((result: any) => {
      this.categoriaProductoArray = result;
    });
  }
}