import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';
import Swal from 'sweetalert2';
import { AdministradorService } from '../../servicios/administrador.service';
import { EditarUsuario } from '../../modelo/editarObjeto';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './editar-usuario.component.html'
})
export class EditarUsuarioComponent implements OnInit {
  form!: FormGroup;
  idUsuario!: number;

  constructor(
    private fb: FormBuilder,
    private svc: UsuarioService,
    private route: ActivatedRoute
  ) {
    this.form = fb.group({
      idUsuario: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      identificacion: ['', Validators.required],
      numerophone: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      estado: ['', Validators.required],
      rol: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const val = params.get('id');
      if (val) {
        this.idUsuario = +val;
        this.svc.getUsuario(this.idUsuario).subscribe({
          next: data => {
            this.form.patchValue(data.respuesta);
            this.form.patchValue({ password: '' }); // ← sobrescribe solo el campo password
          },
          error: () => Swal.fire('Error', 'No se cargó el usuario', 'error')
        });

      }
    });

  }

editar() {
  if (this.form.valid) {
    const usuarioEditado:EditarUsuario = {
      idUsuario: this.idUsuario,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      identificacion: this.form.value.identificacion,
      numerophone: this.form.value.numerophone,
      edad: this.form.value.edad,
      correo: this.form.value.correo,
      password: this.form.value.password,
      estado: this.form.value.estado,
      rol: this.form.value.rol
    };

    this.svc.editarUsuario(usuarioEditado).subscribe({
      next: () => Swal.fire('Actualizado', 'Usuario actualizado', 'success'),
      error: () => Swal.fire('Error', 'No se pudo actualizar', 'error')
    });
  } else {
    Swal.fire('Error', 'Revisa los campos obligatorios', 'error');
  }
}

}
