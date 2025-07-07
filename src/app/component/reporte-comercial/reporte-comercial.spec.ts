import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteComercial } from './reporte-comercial';

describe('ReporteComercial', () => {
  let component: ReporteComercial;
  let fixture: ComponentFixture<ReporteComercial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReporteComercial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteComercial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
