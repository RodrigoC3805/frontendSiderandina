import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { ILoginRequest } from '../../model/login-request';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(2)]),
  });

  login () {
    console.log(this.form.value);
    if (this.form.invalid) {
      console.log('form invalid');
      return;
    }
    if (!this.form.value.email) {
      console.log('email is required');
      return;
    }
    if(!this.form.value.password) {
      console.log('password is required');
      return;
    }
    const request: ILoginRequest = {
      email: this.form.value.email,
      password: this.form.value.password
    };
    this.authService.login(request).subscribe(
      response => {
        // Decodificar el token y mostrar info del usuario
        const decoded: any = jwtDecode(response.token);
        console.log('Usuario logeado:', decoded);
        if(decoded && decoded.tipoUsuario) {
          console.log('Tipo de usuario:', decoded.tipoUsuario);
        }
        this.router.navigate(['/sistema']);
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Ingreso fallido',
        });
      });

  }
}
