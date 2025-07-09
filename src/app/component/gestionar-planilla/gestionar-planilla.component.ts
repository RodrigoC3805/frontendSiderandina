import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlanillaService } from '../../service/planilla.service';
import { PlanillaResponse } from '../../model/planilla-response';
import { DetallePlanillaResponse } from '../../model/detalle-planilla-response';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle } from 'ng-apexcharts';

@Component({
  selector: 'app-gestionar-planilla',
  standalone: true,
  imports: [CommonModule, FormsModule, NgApexchartsModule],
  templateUrl: './gestionar-planilla.component.html',
  styleUrls: ['./gestionar-planilla.component.css']
})
export class GestionarPlanillaComponent implements OnInit {
  planillas: PlanillaResponse[] = [];
  detallePlanilla: DetallePlanillaResponse[] = [];
  mes: number;
  anio: number;
  anioFiltro: number = new Date().getFullYear();
  selectedPlanilla: PlanillaResponse | null = null;

  meses: string[] = [
    '', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  // ApexCharts config
  public chartSeries: ApexAxisChartSeries = [
    { name: "Sueldos", data: [] }
  ];
  public chartDetails: ApexChart = {
    type: "line",
    height: 350
  };
  public chartTitle: ApexTitleSubtitle = {
    text: "Evolución de Sueldos por Mes"
  };
  public chartXAxis: ApexXAxis = {
    categories: [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ]
  };

  sortColumn: string = 'anio';
  sortDirection: 'asc' | 'desc' = 'desc';

  constructor(private planillaService: PlanillaService) {}

  ngOnInit() {
    this.listarPlanillas();
  }

  generarPlanilla() {
    this.planillaService.generarPlanilla({ mes: this.mes, anio: this.anio }).subscribe(() => {
      this.listarPlanillas();
    });
  }

  listarPlanillas() {
    this.planillaService.listarPlanillas(this.anioFiltro).subscribe(data => {
      this.planillas = data;
      this.sortPlanillas();
      this.updateChart();
    });
  }

  // Actualiza el gráfico con los datos del año filtrado
  updateChart() {
    // Inicializa los sueldos por mes en 0
    const sueldosPorMes = Array(12).fill(0);
    this.planillas.forEach(p => {
      if (p.mes >= 1 && p.mes <= 12) {
        sueldosPorMes[p.mes - 1] = p.totalSueldos || 0;
      }
    });
    this.chartSeries = [
      {
        name: "Sueldos",
        data: sueldosPorMes
      }
    ];
    this.chartTitle = {
      text: `Evolución de Sueldos por Mes (${this.anioFiltro})`
    };
  }

  verDetalle(planilla: PlanillaResponse) {
    this.selectedPlanilla = planilla;
    this.planillaService.listarDetallePlanilla(planilla.idPlanilla).subscribe(data => {
      this.detallePlanilla = data;
    });
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortPlanillas();
    this.updateChart();
  }

  sortPlanillas() {
    this.planillas.sort((a, b) => {
      const valueA = (a as any)[this.sortColumn];
      const valueB = (b as any)[this.sortColumn];
      let valA = valueA;
      let valB = valueB;
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
}