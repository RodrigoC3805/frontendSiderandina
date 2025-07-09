import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecibirPedidoComponent } from './recibir-pedido.component';

describe('RecibirPedidoComponent', () => {
  let component: RecibirPedidoComponent;
  let fixture: ComponentFixture<RecibirPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecibirPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecibirPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
