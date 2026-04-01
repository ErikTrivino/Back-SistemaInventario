import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { ClienteService } from '../../servicios/cliente.service';
import { CrearCliente } from '../../modelo/crearObjetos';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-crear-cliente',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-cliente.component.html',
  styleUrl: './crear-cliente.component.css',
})
export class CrearClienteComponent {
  crearClienteForm!: FormGroup;
  cliente!: CrearCliente;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService
  ) {
    this.crearFormulario();
  }

  private crearFormulario() {
    this.crearClienteForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      identificacion: ['', [Validators.required]],
      //correo: ['', [Validators.required, Validators.email]],
     // direccion: ['', [Validators.required]],
      //telefono: ['', [Validators.required]],
    });
  }

  public crearCliente() {
    if (this.crearClienteForm.valid) {
      //this.cliente = this.crearClienteForm.value;

      const clienteData = this.crearClienteForm.value;

      this.clienteService.crearCliente(clienteData).subscribe({
        next: (data: { respuesta: any }) => {
          Swal.fire('¡Éxito!', 'Cliente creado correctamente.', 'success');
          this.crearClienteForm.reset();
        },
        error: (error: { error: { respuesta: string } }) => {
          Swal.fire('¡Error!', error.error.respuesta || 'No se pudo crear el cliente.', 'error');
        }
      });
    } else {
      Swal.fire('¡Error!', 'Por favor complete todos los campos requeridos.', 'error');
    }
  }
}
