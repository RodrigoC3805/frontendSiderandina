import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsistenciaService } from '../../service/asistencia.service';
import { TrabajadoresService } from '../../service/trabajadores.service';

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
    this.asistenciaForm = this.fb.group({
      numeroDocumento: [''],
      fecha: [''],
      hora: ['']
    });
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
    }).subscribe(() => alert('Ingreso registrado'));
  }

  registrarSalida() {
    const { numeroDocumento, fecha, hora } = this.asistenciaForm.value;
    this.asistenciaService.registrarSalida({
      numeroDocumento,
      fecha,
      horaSalida: hora
    }).subscribe(() => alert('Salida registrada'));
  }
}