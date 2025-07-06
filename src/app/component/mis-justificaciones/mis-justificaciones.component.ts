import { Component } from '@angular/core';
import { JustificacionService } from '../../service/justificacion.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { IMotivoJustificacion } from '../../model/motivo-justificacion';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../service/auth.service';
import { IJustificacionRequest } from '../../model/justificacion-request';
import { IJustificacionResponse } from '../../model/justificacion-response';

@Component({
  selector: 'app-mis-justificaciones',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  templateUrl: './mis-justificaciones.component.html',
  styleUrl: './mis-justificaciones.component.css',
  providers: [JustificacionService, AuthService],
})
export class MisJustificacionesComponent {
  misJustificacionesArray: IJustificacionResponse[] = [];
  motivosArray: IMotivoJustificacion[] = [];
  motivoSeleccionado: IMotivoJustificacion = {} as IMotivoJustificacion;
  justificacionForm: FormGroup;
  minFecha = '';
  maxFecha = '';
  page = 1;
  constructor(
    private justificacionService: JustificacionService,
    private authService: AuthService
  ) {
    this.justificacionForm = new FormGroup(
      {
        fecha: new FormControl('', [
          Validators.required,
          this.fechaValida.bind(this),
        ]),
        horaInicio: new FormControl('', Validators.required),
        horaFin: new FormControl('', Validators.required),
        motivoJustificacion: new FormControl('', Validators.required),
        documentoSustento: new FormControl('', [
          Validators.required,
          this.docSustentoValidator,
        ]),
      },
      { validators: this.rangoHorasValidator }
    );
    const hoy = new Date();
    const haceUnaSemana = new Date(hoy);
    haceUnaSemana.setDate(hoy.getDate() - 7);

    const unMesAdelante = new Date(hoy);
    unMesAdelante.setMonth(hoy.getMonth() + 1);

    // Formatea a yyyy-mm-dd para el input date
    this.minFecha = haceUnaSemana.toISOString().split('T')[0];
    this.maxFecha = unMesAdelante.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.getMotivoJustificacion();
    this.getMisJustificaciones();
  }
  getMisJustificaciones() {
    this.authService.findTrabajadorByUserEmail().subscribe(
      (result: any) => {
        const idTrabajador = result.idTrabajador;
        this.justificacionService
          .getMisJustificaciones(idTrabajador)
          .subscribe(
            (result: any) => {
              console.log(result);
              this.misJustificacionesArray = result;
            },
            (err: any) => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al obtener las justificaciones.',
              });
            }
          );
      },
      (err: any) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al obtener los datos del trabajador.',
        });
      }
    );
  }
  getMotivoJustificacion() {
    this.justificacionService
      .getMotivoJustificacion()
      .subscribe((result: any) => {
        this.motivosArray = result;
        console.log(this.motivosArray);
      });
  }
  // Validador personalizado para archivo PDF < 3MB
  docSustentoValidator(control: AbstractControl): ValidationErrors | null {
    const file = control.value;
    if (!file) return null;
    // El valor puede ser File o string vacío
    if (typeof file === 'string') return null;
    if (!(file instanceof File)) return { tipo: 'Archivo inválido' };

    const esPdf = file.type === 'application/pdf';
    const menor3mb = file.size <= 3 * 1024 * 1024;
    if (!esPdf) return { tipo: 'El archivo debe ser un PDF.' };
    if (!menor3mb) return { tamano: 'El archivo debe pesar menos de 3MB.' };
    return null;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.justificacionForm.get('documentoSustento')?.setValue(file || '');
    this.justificacionForm.get('documentoSustento')?.updateValueAndValidity();
  }
  fechaValida(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    if (!valor) return null;
    const fecha = new Date(valor);
    const min = new Date(this.minFecha);
    const max = new Date(this.maxFecha);
    if (fecha < min || fecha > max) {
      return { rango: true };
    }
    return null;
  }
  rangoHorasValidator: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    const horaInicio = group.get('horaInicio')?.value;
    const horaFin = group.get('horaFin')?.value;
    if (!horaInicio || !horaFin) return null; // No validar si falta algún valor

    // Asume formato 'HH:mm'
    if (horaFin <= horaInicio) {
      return { rangoHoras: true };
    }
    return null;
  };
  setMotivo(event: Event): void {
    const inputChangeValue = (event.target as HTMLInputElement).value;
    const index = this.motivosArray.findIndex(
      (m) => m.idMotivoJustificacion === Number(inputChangeValue)
    );
    if (index !== -1) {
      this.motivoSeleccionado = this.motivosArray.at(index);
    }
    this.justificacionForm.controls['motivoJustificacion'].setValue(
      inputChangeValue
    );
  }
  enviarJustificacion(): void {
    if (!this.justificacionForm.valid) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos correctamente.',
        icon: 'error',
      });
      return;
    }

    this.authService.findTrabajadorByUserEmail().subscribe(
      (result: any) => {
        const idTrabajador = result.idTrabajador;

        const fecha = this.justificacionForm.get('fecha')?.value;
        const horaInicio = this.justificacionForm.get('horaInicio')?.value;
        const horaFin = this.justificacionForm.get('horaFin')?.value;
        const motivoJustificacion = this.justificacionForm.get(
          'motivoJustificacion'
        )?.value;
        const documentoSustento =
          this.justificacionForm.get('documentoSustento')?.value;

        const request: IJustificacionRequest = {
          idTrabajador: idTrabajador,
          dia_asistencia: fecha,
          hora_entrada: horaInicio,
          hora_salida: horaFin,
          fechaSolicitud: new Date().toISOString().split('T')[0],
          idMotivoJustificacion: motivoJustificacion,
        };

        console.log(request);
        this.justificacionService
          .crearJustificacion(request, documentoSustento)
          .subscribe(
            (result: any) => {
              Swal.fire({
                title: 'Éxito',
                text: 'Justificación enviada correctamente.',
                icon: 'success',
              }).then(() => {
                this.justificacionForm.reset();
                this.justificacionForm.get('documentoSustento')?.setValue('');
                this.getMisJustificaciones();
              });
            },
            (err: any) => {
              Swal.close();
              Swal.fire({
                icon: 'error',
                title: 'Advertencia...',
                text: 'Ocurrió un error al registrar la justificación',
              });
            }
          );
      },
      (err: any) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Advertencia...',
          text: 'Ocurrió un error al obtener los datos del trabajador',
        });
      }
    );
  }
  descargarDocSustento(idJustificacion: number): void{
    this.justificacionService.descargarArchivo(idJustificacion).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `justificacion_${idJustificacion}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error descargando:', err);
        alert('No se pudo descargar el archivo');
      },
    });
  }
}
