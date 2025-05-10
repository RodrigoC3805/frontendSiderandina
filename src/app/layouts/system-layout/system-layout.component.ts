import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TrabajadoresListaComponent } from '../../component/trabajadores-lista/trabajadores-lista.component';

@Component({
  selector: 'app-system-layout',
  imports: [CommonModule, RouterModule,TrabajadoresListaComponent],
  templateUrl: './system-layout.component.html',
  styleUrl: './system-layout.component.css'
})
export class SystemLayoutComponent {

}
