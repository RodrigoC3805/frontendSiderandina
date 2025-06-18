import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsistenciaService } from '../../service/asistencia.service';
import { TrabajadoresService } from '../../service/trabajadores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asistencia-form',
  imports: [ReactiveFormsModule],
  templateUrl: './asistencia-form.component.html',
  styleUrls: ['./asistencia-form.component.css']
})
export class AsistenciaFormComponent {
  asistenciaForm: FormGroup;
  nombreCompleto: string = '';

  constructor(
    private fb: FormBuilder,
    private asistenciaService: AsistenciaService,
    private trabajadoresService: TrabajadoresService
  ) {
    // Inicializar con la fecha y hora actual
    const now = new Date();
    const fechaActual = now.toISOString().slice(0, 10); // yyyy-MM-dd
    const horaActual = now.toTimeString().slice(0, 5); // HH:mm

    this.asistenciaForm = this.fb.group({
      numeroDocumento: [''],
      fecha: [fechaActual],
      hora: [horaActual]
    });

    this.nombreCompleto = '';
  }

  private resetFormWithCurrentDateTime() {
    const now = new Date();
    const fechaActual = now.toISOString().slice(0, 10);
    const horaActual = now.toTimeString().slice(0, 5);
    this.asistenciaForm.reset({
      numeroDocumento: '',
      fecha: fechaActual,
      hora: horaActual
    });
    this.nombreCompleto = '';
  }

  buscarTrabajador() {
  const numeroDocumento = this.asistenciaForm.value.numeroDocumento;
  this.trabajadoresService.buscarPorNumeroDocumento(numeroDocumento).subscribe({
    next: trabajador => {
      this.nombreCompleto = trabajador.nombres + ' ' + trabajador.apellidoPaterno + ' ' + trabajador.apellidoMaterno;
    },
    error: () => {
      this.nombreCompleto = 'No encontrado';
    }
  });
}

  registrarIngreso() {
    const { numeroDocumento, fecha, hora } = this.asistenciaForm.value;
    this.asistenciaService.registrarIngreso({
      numeroDocumento,
      fecha,
      horaIngreso: hora
    }).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Ingreso registrado',
          showConfirmButton: false,
          timer: 1800
        });
        this.resetFormWithCurrentDateTime();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar ingreso',
          timer: 1800
        });
      }
    });
  }

  registrarSalida() {
    const { numeroDocumento, fecha, hora } = this.asistenciaForm.value;
    this.asistenciaService.registrarSalida({
      numeroDocumento,
      fecha,
      horaSalida: hora
    }).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Salida registrada',
          showConfirmButton: false,
          timer: 1800
        });
        this.resetFormWithCurrentDateTime();
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar salida',
          timer: 1800
        });
      }
    });
  }
}