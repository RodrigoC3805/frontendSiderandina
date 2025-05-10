import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EmpleadosService } from '../../service/empleados.service';

@Component({
  selector: 'app-empleados-lista',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './empleados-lista.component.html',
  styleUrls: ['./empleados-lista.component.css'],
  providers: [EmpleadosService]
})
export class EmpleadosListaComponent implements OnInit {
  empleados: any[] = [];
  loading = true;
  error = '';

  constructor(private empleadosService: EmpleadosService) {}

  ngOnInit(): void {
    this.empleadosService.getEmpleados().subscribe({
      next: (data) => {
        this.empleados = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar empleados';
        this.loading = false;
      }
    });
  }
}