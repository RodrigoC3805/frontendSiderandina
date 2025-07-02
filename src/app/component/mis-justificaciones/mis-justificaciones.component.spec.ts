import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisJustificacionesComponent } from './mis-justificaciones.component';

describe('MisJustificacionesComponent', () => {
  let component: MisJustificacionesComponent;
  let fixture: ComponentFixture<MisJustificacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MisJustificacionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisJustificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
