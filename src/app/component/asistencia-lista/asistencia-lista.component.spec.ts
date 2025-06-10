import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaListaComponent } from './asistencia-lista.component';

describe('AsistenciaListaComponent', () => {
  let component: AsistenciaListaComponent;
  let fixture: ComponentFixture<AsistenciaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenciaListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
