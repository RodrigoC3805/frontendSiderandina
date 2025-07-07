import { Component } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ICotizacionResponse } from '../../model/cotizacion-response';
import { CotizacionService } from '../../service/cotizacion.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { errorContext } from 'rxjs/internal/util/errorContext';

@Component({
  selector: 'app-realizar-cotizacion',
  imports: [NgxPaginationModule, CommonModule, HttpClientModule],
  templateUrl: './realizar-cotizacion.component.html',
  styleUrl: './realizar-cotizacion.component.css',
})
export class RealizarCotizacionComponent {
  page: number = 1;
  cotizacionArray: ICotizacionResponse[] = [];
  constructor(private cotizacionService: CotizacionService) {}
  ngOnInit(): void {
    this.getCotizaciones();
  }
  getCotizaciones(): void {
    this.cotizacionService.listarCotizaciones().subscribe((result: any) => {
      this.cotizacionArray = result;
      console.log(this.cotizacionArray);
    });
  }
  showDetalles(indexCotizacion: number): void {
    const realIndex = (this.page - 1) * 10 + indexCotizacion;
    let detalleCotizacionRows = '';
    let botonesEntregarRechazar = '';
    let desactivarEdicion = '';
    let porcentajeDscto = '0%';
    let valorDscto = 0;
    if (this.cotizacionArray[realIndex].estadoCotizacion.idEstadoCot === 1) {
      this.cotizacionArray[realIndex].detalles.forEach((detalle, index) => {
        detalleCotizacionRows += `
        <tr>
          <td>${index + 1}</td>
          <td>${detalle.producto.nombre || '-'}</td>
          <td>${detalle.cantidad || 0}</td>
          <td>${detalle.producto.stock}</td>
          <td>
            <input ${desactivarEdicion} type="number" min="0" step="0.01" 
              id="precio-input-${index}"
              value="${detalle.producto.precioVentaBase || ''}" 
              style="width: 100px;"/>
          </td>
        </tr>
      `;
      });
    } else {
      this.cotizacionArray[realIndex].detalles.forEach((detalle, index) => {
        detalleCotizacionRows += `
        <tr>
          <td>${index + 1}</td>
          <td>${detalle.producto.nombre || '-'}</td>
          <td>${detalle.cantidad || 0}</td>
          <td>${detalle.producto.stock}</td>
          <td>${detalle.precioCotizado || '0.00'}</td>
        </tr>
      `;
      });
    }
    if (
      Number(
        this.cotizacionArray[realIndex].cliente.tipoCliente.idTipoCliente
      ) === 2
    ) {
      porcentajeDscto = '5%';
      valorDscto = 0.05;
    }
    console.log(this.cotizacionArray[realIndex]);
    if (detalleCotizacionRows.length === 0) {
      detalleCotizacionRows = `
      <tr>
        <td colspan="5" style="text-align: center;">No hay detalles disponibles para esta cotización</td>
      </tr>
    `;
    }
    if (
      Number(this.cotizacionArray[realIndex].estadoCotizacion.idEstadoCot) === 1
    ) {
      botonesEntregarRechazar = `<div style="text-align: right; margin-top: 20px;">
          <button id="btn-aceptar" class="swal2-confirm swal2-styled" style="margin-right:10px">Entregar</button>
          <button id="btn-rechazar" class="swal2-cancel swal2-styled" style="background-color: #ff0000;">Rechazar</button>
        </div>`;
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
            <div>Código: ${
              this.cotizacionArray[realIndex].codigoCotizacion
            }</div>
            <div>Fecha: ${this.formatDateTime(
              this.cotizacionArray[realIndex].fechaEmision
            )}</div>
          </div>
          <div class="cabecera-grupo">
            <div class="cabecera-titulo">Cliente</div>
            <div>${
              this.cotizacionArray[realIndex].cliente.ruc +
                ' - ' +
                this.cotizacionArray[realIndex].cliente.razonSocial || '-'
            }</div>
            <div"><strong>Estado: </strong>${
              this.cotizacionArray[realIndex].estadoCotizacion.descripcion
            }</div>
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
        <div id="subtotal" style="margin-top: 1rem;">
      Subtotal: S/ <span id="subtotal-span">0.00</span><br>
      Subtotal con Dscto.(${porcentajeDscto}): S/ <span id="dscto-span">0.00</span><br>
      IGV (18%): S/ <span id="igv-span">0.00</span><br>
      Total: S/ <span id="total-span">0.00</span><br>
    </div>
        ${botonesEntregarRechazar}
      </div>
    `,
      showCloseButton: true,
      showConfirmButton: false,
      didOpen: () => {
        const swalEl = Swal.getPopup();
        swalEl?.querySelector('#btn-aceptar')?.addEventListener('click', () => {
          // Leer los valores de los inputs
          const detallesActualizar = this.cotizacionArray[
            realIndex
          ].detalles.map((detalle, idx) => {
            const input = document.getElementById(
              `precio-input-${idx}`
            ) as HTMLInputElement;
            return {
              idDetalleCotizacion: detalle.idDetalleCotizacion,
              idProducto: detalle.producto.idProducto,
              cantidad: detalle.cantidad,
              precioCotizado: input ? parseFloat(input.value) : 0,
            };
          });

          // Llamar al backend para actualizar precios y estado
          this.cotizacionService
            .actualizarPreciosYEstado(
              this.cotizacionArray[realIndex].idCotizacion,
              detallesActualizar
            )
            .subscribe({
              next: () => {
                Swal.close();
                Swal.fire({
                  title: 'Cotización entregada correctamente',
                  icon: 'success',
                  confirmButtonText: 'OK',
                });
                this.getCotizaciones(); // Refresca la tabla
              },
              error: (err) => {
                Swal.close();
                let mensaje = 'Error al entregar la cotización';
                if (err?.error?.message) {
                  mensaje = err.error.message;
                } else if (err?.error) {
                  mensaje = typeof err.error === 'string' ? err.error : mensaje;
                }
                Swal.fire({
                  title: 'Ha ocurrido un error',
                  text: mensaje,
                  icon: 'error',
                  confirmButtonText: 'OK',
                });
              },
            });
        });
        const calcularTotales = () => {
          if (
            this.cotizacionArray[realIndex].estadoCotizacion.idEstadoCot === 1
          ) {
            let subtotal = 0;
            this.cotizacionArray[realIndex].detalles.forEach((detalle, idx) => {
              const input = document.getElementById(
                `precio-input-${idx}`
              ) as HTMLInputElement;
              const precio = parseFloat(input.value) || 0;
              subtotal += precio * (detalle.cantidad || 1);
            });
            const dscto = subtotal * (1 - valorDscto);
            const igv = dscto * 0.18;
            const total = dscto + igv;
            (document.getElementById('dscto-span') as HTMLElement).textContent =
              dscto.toFixed(2);
            (
              document.getElementById('subtotal-span') as HTMLElement
            ).textContent = subtotal.toFixed(2);
            (document.getElementById('igv-span') as HTMLElement).textContent =
              igv.toFixed(2);
            (document.getElementById('total-span') as HTMLElement).textContent =
              total.toFixed(2);
            this.cotizacionArray[realIndex].detalles.forEach((_, idx) => {
              const input = document.getElementById(
                `precio-input-${idx}`
              ) as HTMLInputElement;
              input.addEventListener('input', calcularTotales);
            });
          } else {
            (document.getElementById('dscto-span') as HTMLElement).textContent =
              this.cotizacionArray[realIndex].descuento.toFixed(2);
            (
              document.getElementById('subtotal-span') as HTMLElement
            ).textContent =
              this.cotizacionArray[realIndex].montoSubtotal.toFixed(2);
            (document.getElementById('igv-span') as HTMLElement).textContent =
              this.cotizacionArray[realIndex].montoIgv.toFixed(2);
            (document.getElementById('total-span') as HTMLElement).textContent =
              this.cotizacionArray[realIndex].montoTotal.toFixed(2);
          }
        };
        // Inicializa los totales al abrir
        calcularTotales();

        swalEl
          ?.querySelector('#btn-rechazar')
          ?.addEventListener('click', () => {
            Swal.fire({
              title: '¿Desea rechazar la cotización?',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonText: 'Sí',
              cancelButtonText: 'Cancelar',
            }).then((result) => {
              if (result.isConfirmed) {
                this.cotizacionService
                  .rechazarCotizacion(
                    this.cotizacionArray[realIndex].idCotizacion,
                    this.cotizacionArray[realIndex].detalles
                  )
                  .subscribe({
                    next: () => {
                      Swal.close();
                      this.getCotizaciones(); // Refresca la tabla
                    },
                    error: () => {
                      Swal.close();
                      alert('Error al actualizar la cotización');
                    },
                  });
                console.log('Rechazado');
              } else {
                // Acción si cancela o cierra
                console.log('Cancelado');
              }
            });
          });
      },
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
}
