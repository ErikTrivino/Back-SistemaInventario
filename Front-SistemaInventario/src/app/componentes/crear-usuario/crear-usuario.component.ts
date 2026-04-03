import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../servicios/usuario.service';
import { SucursalService } from '../../servicios/sucursal.service';
import { MensajeDTO } from '../../modelo/mensaje-dto';
import { CrearUsuario } from '../../modelo/crearObjetos';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './crear-usuario.component.html'
})
export class CrearUsuarioComponent implements OnInit {
  form!: FormGroup;
  sucursales: any[] = [];
  roles: string[] = ['ADMIN', 'GERENTE', 'OPERADOR'];

  constructor(
    private fb: FormBuilder,
    private svc: UsuarioService,
    private sucursalSvc: SucursalService
  ) {
    this.form = fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: ['', Validators.required],
      sucursalAsignadaId: [null, Validators.required],
      activo: [true],
      motivoInactivacion: ['']
    });
  }

  ngOnInit(): void {
    this.cargarSucursales();
  }

  cargarSucursales(): void {
    this.sucursalSvc.listar().subscribe({
      next: (data: MensajeDTO) => {
        this.sucursales = data.respuesta;
      },
      error: (err) => {
        console.error('Error cargando sucursales', err);
      }
    });
  }

  crear() {
    if (this.form.valid) {
      const usuario: CrearUsuario = this.form.value;
      this.svc.crearUsuario(usuario).subscribe({
        next: (data: MensajeDTO) => {
          Swal.fire('Éxito', data.respuesta || 'Usuario creado correctamente', 'success');
          this.form.reset({ activo: true });
        },
        error: (err: any) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo crear el usuario', 'error');
        }
      });
    } else {
      Swal.fire('Error', 'Completa los campos requeridos', 'error');
    }
  }
}
