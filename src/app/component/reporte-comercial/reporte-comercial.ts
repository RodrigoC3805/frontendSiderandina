import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule, ApexNonAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexResponsive, ApexLegend, ApexAxisChartSeries, ApexXAxis } from 'ng-apexcharts';
import { ReporteComercialService } from '../../service/reporte-comercial-service';
import { ReporteProveedorCompras } from '../../model/reporte-proveedor-compras';
import { ReportePedidosProveedor } from '../../model/reporte-pedido-por-proveedor';
import { ProductoMasVendido } from '../../model/producto-mas-vendido';

@Component({
  selector: 'app-reporte-comercial',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './reporte-comercial.html',
  styleUrls: ['./reporte-comercial.css']
})
export class ReporteComercial implements OnInit {
  // Pie chart: Cantidad de pedidos por proveedor
  pieSeries: ApexNonAxisChartSeries = [];
  pieLabels: string[] = [];
  pieChartDetails: ApexChart = { type: 'pie', height: 450 };
  pieTitle: ApexTitleSubtitle = { text: 'Cantidad de pedidos por proveedor' };
  pieLegend: ApexLegend = { position: 'bottom' };
  pieResponsive: ApexResponsive[] = [
    {
      breakpoint: 480,
      options: {
        chart: { width: 300 },
        legend: { position: 'bottom' }
      }
    }
  ];

  // Bar chart: Proveedores por volumen de compras
  barSeries: ApexAxisChartSeries = [];
  barChartDetails: ApexChart = { type: 'bar', width: 400, height: 480 }; 
  barTitle: ApexTitleSubtitle = { text: 'Proveedores por volumen de compras' };
  barXAxis: ApexXAxis = { categories: [] };

  loading = true;
  fechaInicio = '';
  fechaFin = '';

  // Gráfico de barras horizontales: Productos más vendidos
  productosMasVendidosSeries: ApexAxisChartSeries = [];
  productosMasVendidosChart: ApexChart = { type: 'bar', height: 550, width: 900, toolbar: { show: true } };
  productosMasVendidosPlotOptions = {
    bar: {
      horizontal: true,
      columnWidth: '70%', // Ancho de las barras
      dataLabels: { position: 'top' } // Posición de etiquetas
    }
  }
  productosMasVendidosTitle: ApexTitleSubtitle = { text: 'Productos más vendidos (unidades)' };
  productosMasVendidosXAxis: ApexXAxis = { categories: [], labels: { style: { fontSize: '13px' } } };

  constructor(private reporteService: ReporteComercialService) {}

  ngOnInit(): void {
    const hoy = new Date();
    this.fechaInicio = `${hoy.getFullYear()}-01-01`;
    this.fechaFin = `${hoy.getFullYear()}-12-31`;
    this.cargarPieChart();
    this.cargarBarChart();
    this.cargarProductosMasVendidos();
  }

  cargarPieChart() {
    this.loading = true;
    this.reporteService.obtenerPedidosPorProveedor(this.fechaInicio, this.fechaFin).subscribe(data => {
      this.pieSeries = data.map(p => p.cantidadPedidos);
      this.pieLabels = data.map(p => p.razonSocial);
      this.loading = false;
    });
  }

  cargarBarChart() {
    this.loading = true;
    this.reporteService.obtenerProveedoresPorCompras().subscribe(data => {
      this.barSeries = [{
        name: 'Monto Total de Compras',
        data: data.map(p => p.montoTotalCompras)
      }];
      this.barXAxis = {
        categories: data.map(p => p.razonSocial)
      };
      this.loading = false;
    });
  }

  cargarProductosMasVendidos() {
    this.reporteService.obtenerProductosMasVendidos().subscribe(data => {
      this.productosMasVendidosSeries = [{
        name: 'Unidades vendidas',
        data: data.map(p => p.totalUnidadesVendidas)
      }];
      this.productosMasVendidosXAxis = {
        categories: data.map(p => p.producto)
      };
    });
  }

}