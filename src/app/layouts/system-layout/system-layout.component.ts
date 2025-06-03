import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-system-layout',
  imports: [CommonModule, RouterModule],
  templateUrl: './system-layout.component.html',
  styleUrl: './system-layout.component.css'
})
export class SystemLayoutComponent {
  auth = inject(AuthService);
  token = localStorage.getItem('token');
  userRole: string = '';
  userEmail: string = '';

  constructor() {
    if (this.token) {
      try {
        const decoded: any = jwtDecode(this.token);
        this.userRole = decoded?.tipoUsuario?.descripcion || '';
        this.userEmail = decoded?.email || '';
      } catch {}
    }
  }

}
