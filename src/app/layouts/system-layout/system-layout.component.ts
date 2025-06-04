import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-system-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './system-layout.component.html',
  styleUrl: './system-layout.component.css'
})
export class SystemLayoutComponent {
  auth = inject(AuthService);
  username$ = this.auth.getNombreUsuario();

  constructor() {

  }

}
