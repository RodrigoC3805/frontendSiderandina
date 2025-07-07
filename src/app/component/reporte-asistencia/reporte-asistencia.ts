import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AsistenciaService } from '../../service/asistencia.service';
import { ReporteAsistencia } from '../../model/reporte-asistencia';
import { ReportePuntualidad } from '../../model/reporte-puntualidad';
import { ReporteHorasExtras } from '../../model/reporte-horas-extras';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle, ApexNonAxisChartSeries, ApexResponsive, NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-reporte-asistencia',
  imports: [CommonModule, FormsModule, NgApexchartsModule],
  templateUrl: './reporte-asistencia.html',
  styleUrls: ['./reporte-asistencia.css']
})
export class ReporteAsistenciaComponent implements OnInit {
  // Gráfico de barras (horas trabajadas)
  public chartSeries: ApexAxisChartSeries = [];
  public chartDetails: ApexChart = { type: 'bar', height: 350 };
  public chartTitle: ApexTitleSubtitle = { text: 'Horas trabajadas por empleado' };
  public chartXAxis: ApexXAxis = { categories: [] };

  // Pie chart de puntualidad
  public pieSeries: ApexNonAxisChartSeries = [];
  public pieChartDetails: ApexChart = { type: 'pie', height: 320 };
  public pieChartLabels: string[] = ['Puntuales', 'Tardanzas', 'Faltas'];
  public pieChartTitle: ApexTitleSubtitle = { text: 'Puntualidad General' };
  public pieChartResponsive: ApexResponsive[] = [
    {
      breakpoint: 480,
      options: {
        chart: { width: 250 },
        legend: { position: 'bottom' }
      }
    }
  ];

  // Gráfico de barras (horas extras)
  public chartExtrasSeries: ApexAxisChartSeries = [];
  public chartExtrasDetails: ApexChart = { type: 'bar', height: 350 };
  public chartExtrasTitle: ApexTitleSubtitle = { text: 'Horas extras por empleado' };
  public chartExtrasXAxis: ApexXAxis = { categories: [] };

  loading = true;
  fechaInicio: string = '';
  fechaFin: string = '';

  constructor(private asistenciaService: AsistenciaService) {}

  ngOnInit(): void {
    this.cargarReporte();
  }

  cargarReporte() {
    this.loading = true;
    // Gráfico de barras: horas trabajadas
    this.asistenciaService.obtenerReporteHorasTrabajadas(this.fechaInicio, this.fechaFin).subscribe((data: ReporteAsistencia[]) => {
      const agrupado: { [nombre: string]: number } = {};
      data.forEach((d: ReporteAsistencia) => {
        agrupado[d.nombreCompleto] = (agrupado[d.nombreCompleto] || 0) + d.horasTrabajadas;
      });
      this.chartSeries = [{
        name: 'Horas trabajadas',
        data: Object.values(agrupado)
      }];
      this.chartXAxis = {
        categories: Object.keys(agrupado)
      };
      this.loading = false;
    });

    // Pie chart de puntualidad
    this.asistenciaService.obtenerReportePuntualidad(this.fechaInicio, this.fechaFin).subscribe((data: ReportePuntualidad) => {
      this.pieSeries = [data.puntuales, data.tardanzas, data.faltas];
    });

    // Gráfico de barras: horas extras
    this.asistenciaService.obtenerReporteHorasExtras(this.fechaInicio, this.fechaFin).subscribe((data: ReporteHorasExtras[]) => {
      const agrupado: { [nombre: string]: number } = {};
      data.forEach((d: ReporteHorasExtras) => {
        agrupado[d.nombreCompleto] = d.horasExtras;
      });
      this.chartExtrasSeries = [{
        name: 'Horas extras',
        data: Object.values(agrupado)
      }];
      this.chartExtrasXAxis = {
        categories: Object.keys(agrupado)
      };
    });
  }

  filtrarPorDia() {
    if (this.fechaInicio) {
      this.fechaFin = this.fechaInicio;
      this.cargarReporte();
    }
  }

  filtrarPorSemana() {
    if (this.fechaInicio) {
      const fecha = new Date(this.fechaInicio);
      const fin = new Date(fecha);
      fin.setDate(fecha.getDate() + 6);
      this.fechaFin = fin.toISOString().slice(0, 10);
      this.cargarReporte();
    }
  }

  limpiarFiltro() {
    this.fechaInicio = '';
    this.fechaFin = '';
    this.cargarReporte();
  }
}