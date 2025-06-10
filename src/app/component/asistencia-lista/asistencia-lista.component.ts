import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from '../../service/asistencia.service';
import { CommonModule } from '@angular/common'; 
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-asistencia-lista',
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './asistencia-lista.component.html',
  styleUrls: ['./asistencia-lista.component.css']
})
export class AsistenciaListaComponent implements OnInit {
  asistencias: any[] = [];
  loading = true;
  error = '';
  page = 1;
  pageSize = 5; // 15 registros por página

  constructor(private asistenciaService: AsistenciaService) {}

  ngOnInit(): void {
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
}