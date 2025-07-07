import { TestBed } from '@angular/core/testing';

import { ReporteComercial } from './reporte-comercial-service';

describe('ReporteComercial', () => {
  let service: ReporteComercial;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReporteComercial);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
