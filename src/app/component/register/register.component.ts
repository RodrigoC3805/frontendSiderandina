import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IRegisterRequest } from '../../model/register-request';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  auth = inject(AuthService);
  router = inject(Router);
  form = new FormGroup({
    ruc: new FormControl('', [
      Validators.pattern(/^\d{11}$/),
      Validators.required,
    ]),
    razonSocial: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required),
    telefono: new FormControl(
      '', [
      Validators.required,
      Validators.pattern(/^\d{7,9}$/)
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  register() {
    console.log(this.form.value);
    if (this.form.controls.ruc.invalid) {
      console.log('ruc invalid');
      Swal.fire({
        icon: 'warning',
        title: 'Ingrese un RUC válido',
      });
      return;
    }
    if (this.form.controls.email.invalid) {
      console.log('email invalid');
      Swal.fire({
        icon: 'warning',
        title: 'Ingrese un email válido',
      });
      return;
    }
    if (this.form.controls.telefono.invalid) {
      console.log('telefono invalid');
      Swal.fire({
        icon: 'warning',
        title: 'Ingrese un teléfono válido',
      });
      return;
    }
    if (this.form.invalid) {
      console.log('falta llenar');
      Swal.fire({
        icon: 'warning',
        title: 'Llenar todos los campos',
      });
      return;
    }
    if (this.form.value.password !== this.form.value.confirmPassword) {
      console.log('Contraseñas no coinciden');
      Swal.fire({
        icon: 'warning',
        title: 'Las contraseñas no coinciden',
      });
      return;
    }
    const request: IRegisterRequest = {
      cliente: {
        ruc: this.form.value.ruc!,
        razonSocial: this.form.value.razonSocial!,
        direccion: this.form.value.direccion!,
        telefono: this.form.value.telefono!,
        tipoCliente: {}
      },
      usuario: {
        email: this.form.value.email!,
        password: this.form.value.password!,
        tipoUsuario: {}
      },
    };
    this.auth.register(request).subscribe(
      (response) => {
        console.log('Registro exitoso:', response);
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Usuario registrado correctamente',
        });
        this.router.navigate(['/sistema']);
      },
      (error) => {
        console.error('Error al registrar usuario:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar usuario',
          text: 'Por favor, intente nuevamente.',
        });
      }
    );
  }
}
