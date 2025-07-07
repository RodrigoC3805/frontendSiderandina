import { Component, OnInit } from '@angular/core';
import { ReporteComercialService } from '../../service/reporte-comercial-service';
import { ReporteProveedorCompras } from '../../model/reporte-proveedor-compras';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexTitleSubtitle } from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-reporte-comercial',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './reporte-comercial.html',
  styleUrl: './reporte-comercial.css'
})
export class ReporteComercial implements OnInit {
  proveedores: ReporteProveedorCompras[] = [];
  chartSeries: ApexAxisChartSeries = [];
  chartDetails: ApexChart = { type: 'bar', height: 350 };
  chartTitle: ApexTitleSubtitle = { text: 'Proveedores por volumen de compras' };
  chartXAxis: ApexXAxis = { categories: [] };
  loading = true;

  constructor(private reporteService: ReporteComercialService) {}

  ngOnInit(): void {
    this.reporteService.obtenerProveedoresPorCompras().subscribe(data => {
      this.proveedores = data;
      this.chartSeries = [{
        name: 'Monto Total de Compras',
        data: data.map(p => p.montoTotalCompras)
      }];
      this.chartXAxis = {
        categories: data.map(p => p.razonSocial)
      };
      this.loading = false;
    });
  }
}
