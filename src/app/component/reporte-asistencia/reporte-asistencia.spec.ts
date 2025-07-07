import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteAsistencia } from './reporte-asistencia';

describe('ReporteAsistencia', () => {
  let component: ReporteAsistencia;
  let fixture: ComponentFixture<ReporteAsistencia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteAsistencia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteAsistencia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
