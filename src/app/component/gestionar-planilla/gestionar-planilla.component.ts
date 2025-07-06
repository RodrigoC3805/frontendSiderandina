import { Component, OnInit } from '@angular/core';
import { PlanillaService } from '../../service/planilla.service';
import { PlanillaResponse } from '../../model/planilla-response';
import { DetallePlanillaResponse } from '../../model/detalle-planilla-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestionar-planilla',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  // Ordenamiento
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
    });
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