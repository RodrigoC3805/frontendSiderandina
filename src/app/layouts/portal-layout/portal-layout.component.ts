import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../component/navbar/navbar.component';

@Component({
  selector: 'app-portal-layout',
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './portal-layout.component.html',
  styleUrl: './portal-layout.component.css'
})
export class PortalLayoutComponent {

}
