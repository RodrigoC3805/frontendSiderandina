import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from '../../service/asistencia.service';
import { CommonModule } from '@angular/common'; 
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-asistencia-lista',
  imports: [CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './asistencia-lista.component.html',
  styleUrls: ['./asistencia-lista.component.css']
})
export class AsistenciaListaComponent implements OnInit {
  asistencias: any[] = [];
  loading = true;
  error = '';
  page = 1;
  pageSize = 5; // 15 registros por página
  numeroDocumentoBusqueda = '';

  constructor(private asistenciaService: AsistenciaService) {}

  ngOnInit(): void {
    this.cargarTodas();
  }

  cargarTodas() {
    this.loading = true;
    this.asistenciaService.getAsistencias().subscribe({
      next: (data) => {
        this.asistencias = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar asistencias';
        this.loading = false;
      }
    });
  }

  buscarPorDocumento() {
    if (!this.numeroDocumentoBusqueda.trim()) {
      this.cargarTodas();
      return;
    }
    this.loading = true;
    this.asistenciaService.buscarAsistenciasPorDocumento(this.numeroDocumentoBusqueda.trim()).subscribe({
      next: (data) => {
        this.asistencias = data;
        this.loading = false;
        this.page = 1;
      },
      error: () => {
        this.error = 'No se encontraron asistencias para ese documento';
        this.asistencias = [];
        this.loading = false;
      }
    });
  }

  limpiarBusqueda() {
    this.numeroDocumentoBusqueda = '';
    this.cargarTodas();
  }

  descargarExcel() {
  window.location.href = 'http://localhost:8080/api/rrhh/asistencia/excel';
  }

}