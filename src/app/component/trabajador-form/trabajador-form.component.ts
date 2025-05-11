import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TrabajadoresService } from '../../service/trabajadores.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-trabajador-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule ],
  templateUrl: './trabajador-form.component.html',
  styleUrls: ['./trabajador-form.component.css']
})
export class TrabajadorFormComponent implements OnInit {
  trabajadorForm: FormGroup;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private trabajadoresService: TrabajadoresService
  ) {
    this.trabajadorForm = this.fb.group({
      nombres: [''],
      apellidos: [''],
      tipoDocumento: [''],
      numeroDocumento: [''],
      fechaNacimiento: [''],
      telefono: [''],
      sueldo: [''],
      moneda: [''],
      tipoTrabajador: [''],
      emailContacto: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.trabajadoresService.getTrabajadorById(+id).subscribe({
        next: (data) => {
          this.trabajadorForm.patchValue({
            nombres: data.nombres,
            apellidos: `${data.apellidoPaterno} ${data.apellidoMaterno}`,
            tipoDocumento: data.idTipoDocumento || (data.tipoDocumento?.idTipoDocumento),
            numeroDocumento: data.numeroDocumento,
            emailContacto: data.emailContacto,
            tipoTrabajador: data.idTipoTrabajador || (data.tipoTrabajador?.idTipoTrabajador),
            fechaNacimiento: data.fechaNacimiento || '',
            telefono: data.telefono || '',
            sueldo: data.sueldo || '',
            moneda: data.moneda || ''
          });
        },
        error: (err) => {
          alert('Error al cargar trabajador');
          console.error(err);
        }
      });
    }
  }

  onSubmit() {
    if (this.isEdit) {
      // ...
    } else {
      const formValue = this.trabajadorForm.value;
      const [apellidoPaterno, apellidoMaterno] = formValue.apellidos.split(' ', 2);
      const trabajadorRequest = {
        idTipoDocumento: formValue.tipoDocumento,
        idTipoTrabajador: formValue.tipoTrabajador, 
        numeroDocumento: formValue.numeroDocumento,
        apellidoPaterno: apellidoPaterno || '',
        apellidoMaterno: apellidoMaterno || '',
        nombres: formValue.nombres,
        emailContacto: formValue.emailContacto|| '',
      };
      this.trabajadoresService.crearTrabajador(trabajadorRequest).subscribe({
        next: () => this.router.navigate(['/sistema/trabajadores']),
        error: (err) => {
          alert('Error al registrar trabajador');
          console.error(err);
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/sistema/trabajadores']);
  }
}