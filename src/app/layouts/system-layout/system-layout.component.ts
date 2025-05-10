import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmpleadosListaComponent } from '../../component/empleados-lista/empleados-lista.component';

@Component({
  selector: 'app-system-layout',
  imports: [CommonModule, RouterModule,EmpleadosListaComponent],
  templateUrl: './system-layout.component.html',
  styleUrl: './system-layout.component.css'
})
export class SystemLayoutComponent {

}
