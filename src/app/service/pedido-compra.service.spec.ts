import { TestBed } from '@angular/core/testing';

import { PedidoCompraService } from './pedido-compra.service';

// Define BASE_URL for testing purposes
const BASE_URL = 'http://localhost:4200'; // Replace with your actual base URL if needed

describe('PedidoCompraService', () => {
  let service: PedidoCompraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PedidoCompraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get pedidos compra', () => {
    const idEstadoPedido = 1;
    const expectedUrl = `${BASE_URL}/almacen/pedidocompra?idEstadoPedido=${idEstadoPedido}`;
    spyOn(service['http'], 'get').and.callThrough();

    service.getPedidosCompra(idEstadoPedido);

    expect(service['http'].get).toHaveBeenCalledWith(expectedUrl);
  });

  it('should get pedidos compra without idEstadoPedido', () => {
    const expectedUrl = `${BASE_URL}/almacen/pedidocompra`;
    spyOn(service['http'], 'get').and.callThrough();

    service.getPedidosCompra();

    expect(service['http'].get).toHaveBeenCalledWith(expectedUrl);
  });
});
