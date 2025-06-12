import { Component } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ICotizacionResponse } from '../../model/cotizacion-response';
import { CotizacionService } from '../../service/cotizacion.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

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
}
