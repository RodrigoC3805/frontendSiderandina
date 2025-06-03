import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaFormComponent } from './asistencia-form.component';

describe('AsistenciaFormComponent', () => {
  let component: AsistenciaFormComponent;
  let fixture: ComponentFixture<AsistenciaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenciaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
