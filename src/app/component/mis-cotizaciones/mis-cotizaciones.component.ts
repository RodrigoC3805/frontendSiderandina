import { Component, OnInit } from '@angular/core';
import { CotizacionService } from '../../service/cotizacion.service';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mis-cotizaciones',
  imports: [CommonModule],
  templateUrl: './mis-cotizaciones.component.html',
  styleUrls: ['./mis-cotizaciones.component.css']
})
export class MisCotizacionesComponent implements OnInit {
  cotizaciones: any[] = [];
  loading = true;
  error = '';

  constructor(
    private cotizacionService: CotizacionService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userInfo: any = this.authService.getUserInfo();
    if (!userInfo || !userInfo.email) {
      this.error = 'No se pudo obtener el usuario logueado.';
      this.loading = false;
      return;
    }
    // Usamos findUsernameCliente para obtener el idCliente por email
    this.authService.findUsernameCliente(userInfo.email).subscribe({
      next: (cliente: any) => {
        if (!cliente || !cliente.idCliente) {
          this.error = 'No se pudo obtener el cliente logueado.';
          this.loading = false;
          return;
        }
        this.cotizacionService.getCotizacionesPorCliente(cliente.idCliente).subscribe({
          next: (data) => {
            this.cotizaciones = data;
            this.loading = false;
          },
          error: () => {
            this.error = 'Error al cargar cotizaciones';
            this.loading = false;
          }
        });
      },
      error: () => {
        this.error = 'No se pudo obtener el cliente logueado.';
        this.loading = false;
      }
    });
  }
}
