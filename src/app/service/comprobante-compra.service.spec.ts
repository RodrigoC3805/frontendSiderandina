import { TestBed } from '@angular/core/testing';

import { ComprobanteCompraService } from './comprobante-compra.service';

describe('ComprobanteCompraService', () => {
  let service: ComprobanteCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprobanteCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
