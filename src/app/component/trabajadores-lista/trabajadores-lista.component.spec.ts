import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajadoresListaComponent } from './trabajadores-lista.component';

describe('EmpleadosListaComponent', () => {
  let component: TrabajadoresListaComponent;
  let fixture: ComponentFixture<TrabajadoresListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrabajadoresListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrabajadoresListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
