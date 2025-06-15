import { Component } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ICotizacionResponse } from '../../model/cotizacion-response';
import { CotizacionService } from '../../service/cotizacion.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { IDetalleCotizacionResponse } from '../../model/detalle-cotizacion-response';

@Component({
  selector: 'app-realizar-cotizacion',
  imports: [NgxPaginationModule, CommonModule, HttpClientModule],
  templateUrl: './realizar-cotizacion.component.html',
  styleUrl: './realizar-cotizacion.component.css',
})
export class RealizarCotizacionComponent {
  page: number = 1;
  cotizacionArray: ICotizacionResponse[] = [];
  detalleSeleccionadoArray: IDetalleCotizacionResponse[] = [];
  constructor(private cotizacionService: CotizacionService) {
  }
  ngOnInit(): void {
    this.getCotizaciones();
  }
  getCotizaciones(): void {
    this.cotizacionService.listarCotizaciones().subscribe((result: any) => {
      this.cotizacionArray = result;
      console.log(this.cotizacionArray);
    });
  }
  setPrecioCotizado(): void {

  }
  setDetalleSeleccionadoArray(indexCotizacion: number): void {
    const realIndex = (this.page - 1) * 10 + indexCotizacion;
    this.detalleSeleccionadoArray = this.cotizacionArray[realIndex].detalles;
    console.log(this.detalleSeleccionadoArray);
  }
  showDetalles(indexCotizacion: number): void {
    const realIndex = (this.page - 1) * 10 + indexCotizacion;
    let detalleCotizacionRows = '';
    this.cotizacionArray[realIndex].detalles.forEach((detalle, index) => {
      detalleCotizacionRows += `
        <tr>
          <td>${index + 1}</td>
          <td>${detalle.producto.nombre || '-'}</td>
          <td>${detalle.cantidad || 0}</td>
          <td>${detalle.producto.stock}</td>
          <td>
            <input type="number" min="0" step="0.01" 
              id="precio-input-${index}"
              value="${detalle.producto.precioVentaBase || ''}" 
              style="width: 100px;"/>
          </td>
        </tr>
      `;
    });

    if (detalleCotizacionRows.length === 0) {
      detalleCotizacionRows = `
        <tr>
          <td colspan="5" style="text-align: center;">No hay detalles disponibles para esta cotización</td>
        </tr>
      `;
    }

    Swal.fire({
      title: `Detalle de la cotización #${realIndex + 1}`,
      width: '800px',
      html: `
        <style>
          .detalle-pedido-container { width: 100%; font-family: Arial, sans-serif; }
          .detalle-cabecera { display: flex; justify-content: space-between; margin-bottom: 20px; padding: 10px; background-color: #f9f9f9; border-radius: 5px; }
          .cabecera-grupo { flex: 1; }
          .cabecera-titulo { font-weight: bold; margin-bottom: 5px; }
          .tabla-detalle { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .tabla-detalle th, .tabla-detalle td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          .tabla-detalle th { background-color: #f2f2f2; }
          .tabla-detalle tr:nth-child(even) { background-color: #f9f9f9; }
          .tabla-footer { text-align: right; font-weight: bold; padding: 10px; background-color: #f2f2f2; border-radius: 5px; }
        </style>
        <div class="detalle-pedido-container">
          <div class="detalle-cabecera">
            <div class="cabecera-grupo">
              <div class="cabecera-titulo">Información de la cotización</div>
              <div>Código: ${this.cotizacionArray[realIndex].codigoCotizacion}</div>
              <div>Fecha: ${this.formatDateTime(this.cotizacionArray[realIndex].fechaEmision)}</div>
            </div>
            <div class="cabecera-grupo">
              <div class="cabecera-titulo">Cliente</div>
              <div>${this.cotizacionArray[realIndex].cliente.ruc + ' - ' + this.cotizacionArray[realIndex].cliente.razonSocial || '-'}</div>
            </div>
          </div>
          <table class="tabla-detalle">
            <thead>
              <tr>
                <th>#</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Stock</th>
                <th>Precio a cotizar</th>
              </tr>
            </thead>
            <tbody>
              ${detalleCotizacionRows}
            </tbody>
          </table>
          <div style="text-align: right; margin-top: 20px;">
            <button id="btn-aceptar" class="swal2-confirm swal2-styled" style="margin-right:10px;">Aceptar</button>
            <button id="btn-rechazar" class="swal2-cancel swal2-styled">Rechazar</button>
          </div>
        </div>
      `,
      showCloseButton: true,
      showConfirmButton: false,
      didOpen: () => {
        const swalEl = Swal.getPopup();
        swalEl?.querySelector('#btn-aceptar')?.addEventListener('click', () => {
          // Leer los valores de los inputs
          const precios: number[] = [];
          this.cotizacionArray[realIndex].detalles.forEach((_, idx) => {
            const input = (document.getElementById(`precio-input-${idx}`) as HTMLInputElement);
            precios.push(input ? parseFloat(input.value) : 0);
          });
          Swal.close();
          // Aquí puedes manejar la acción de aceptar y los precios ingresados
          console.log('Cotización aceptada. Precios:', precios);
        });
        swalEl?.querySelector('#btn-rechazar')?.addEventListener('click', () => {
          Swal.close();
          // Aquí puedes manejar la acción de rechazar
          console.log('Cotización rechazada');
        });
      }
    });
  }
  formatDateTime(dateString: string | undefined): string {
    if (!dateString) return '-';

    try {
      const date = new Date(dateString);
      return `${date.getDate().toString().padStart(2, '0')}/${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}/${date.getFullYear()} ${date
        .getHours()
        .toString()
        .padStart(2, '0')}:${date
        .getMinutes()
        .toString()
        .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return dateString;
    }
  }
  aceptarCotizacion(): void {

  }
}
