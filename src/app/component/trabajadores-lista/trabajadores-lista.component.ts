import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TrabajadoresService } from '../../service/trabajadores.service';
import { RouterModule } from '@angular/router';
import { NgApexchartsModule, ApexNonAxisChartSeries, ApexChart, ApexResponsive, ApexLegend, ApexTitleSubtitle } from 'ng-apexcharts';

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

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-trabajadores-lista',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule, NgApexchartsModule],
  templateUrl: './trabajadores-lista.component.html',
  styleUrls: ['./trabajadores-lista.component.css'],
  providers: [TrabajadoresService]
})
export class TrabajadoresListaComponent implements OnInit {
  trabajadores: Trabajador[] = [];
  loading = true;
  error = '';
  public pieChartOptions: any = {
    series: [],
    chart: {
      type: 'donut',
      width: 380
    },
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: { width: 200 },
          legend: { position: 'bottom' }
        }
      }
    ],
    legend: { position: 'right' },
    title: { text: 'Trabajadores por Tipo de Documento' }
  };

  constructor(private trabajadoresService: TrabajadoresService) {}

  ngOnInit(): void {
    this.trabajadoresService.getTrabajadores().subscribe({
      next: (data: Trabajador[]) => {
        this.trabajadores = data;
        this.setupPieChart();
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar trabajadores';
        this.loading = false;
      }
    });
  }

  setupPieChart() {
    const tipoDocumentoCount: { [key: string]: number } = {};
    this.trabajadores.forEach(t => {
      tipoDocumentoCount[t.tipoDocumento] = (tipoDocumentoCount[t.tipoDocumento] || 0) + 1;
    });

    this.pieChartOptions.series = Object.values(tipoDocumentoCount);
    this.pieChartOptions.labels = Object.keys(tipoDocumentoCount);
  }
}