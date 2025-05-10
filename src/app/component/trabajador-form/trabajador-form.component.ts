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
      moneda: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      // Si tienes un método para obtener un trabajador por ID, descomenta y usa:
      // this.trabajadoresService.getTrabajadorById(id).subscribe(data => this.trabajadorForm.patchValue(data));
    }
  }

  onSubmit() {
    if (this.isEdit) {
      // Lógica para actualizar trabajador
    } else {
      // Lógica para registrar nuevo trabajador
    }
  }

  cancelar() {
    this.router.navigate(['/trabajadores/lista']); // Cambia la ruta si tu lista tiene otra ruta
  }
}