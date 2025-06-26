import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TrabajadoresService } from '../../service/trabajadores.service';
import { RouterModule } from '@angular/router';

export interface Trabajador {
  idTrabajador: number;
  nombreCompleto: string;
  tipoDocumento: string;
  numeroDocumento: string;
  cargo: string;
  sueldo: number;
  moneda: string;
  estadoContrato: string;
}

@Component({
  selector: 'app-trabajadores-lista',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './trabajadores-lista.component.html',
  styleUrls: ['./trabajadores-lista.component.css'],
  providers: [TrabajadoresService]
})
export class TrabajadoresListaComponent implements OnInit {
  trabajadores: Trabajador[] = [];
  loading = true;
  error = '';

  constructor(private trabajadoresService: TrabajadoresService) {}

  ngOnInit(): void {
    this.trabajadoresService.getTrabajadores().subscribe({
      next: (data: Trabajador[]) => {
        this.trabajadores = data;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar trabajadores';
        this.loading = false;
      }
    });
  }
}