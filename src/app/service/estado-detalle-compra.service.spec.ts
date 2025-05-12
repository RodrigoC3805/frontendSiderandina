import { TestBed } from '@angular/core/testing';

import { EstadoDetalleCompraService } from './estado-detalle-compra.service';

describe('EstadoDetalleCompraService', () => {
  let service: EstadoDetalleCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoDetalleCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
