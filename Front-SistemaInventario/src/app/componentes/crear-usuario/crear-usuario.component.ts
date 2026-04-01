import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../servicios/usuario.service';
import { AdministradorService } from '../../servicios/administrador.service';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-usuario.component.html'
})
export class CrearUsuarioComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder, private svc: UsuarioService) {
    this.form = fb.group({
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

  crear() {
    if (this.form.valid) {
      this.svc.crearUsuario(this.form.value).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Usuario creado correctamente', 'success');
          this.form.reset();
        },
        error: () => Swal.fire('Error', 'No se pudo crear el usuario', 'error')
      });
    } else {
      Swal.fire('Error', 'Completa los campos requeridos', 'error');
    }
  }
}
