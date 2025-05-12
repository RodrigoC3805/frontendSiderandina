import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasSidebarComponent } from './categorias-sidebar.component';

describe('CategoriasSidebarComponent', () => {
  let component: CategoriasSidebarComponent;
  let fixture: ComponentFixture<CategoriasSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriasSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriasSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
