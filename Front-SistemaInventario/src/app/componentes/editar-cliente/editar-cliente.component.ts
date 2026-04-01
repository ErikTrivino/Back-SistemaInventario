import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ClienteService } from '../../servicios/cliente.service';
import Swal from 'sweetalert2';
import { Cliente } from '../../modelo/cliente/cliente';
import { EditarCliente } from '../../modelo/editarObjeto';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css'
})
export class EditarClienteComponent implements OnInit {
  editarClienteForm!: FormGroup;
  idCliente!: number;
  cliente!: EditarCliente;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.editarClienteForm = this.formBuilder.group({
      idCliente: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      identificacion: ['', [Validators.required]],
      //correo: ['', [Validators.required, Validators.email]],
      //direccion: ['', Validators.required],
      //telefono: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idCliente = +id;
        this.cargarCliente(this.idCliente);
      }
    });
  }

  cargarCliente(id: number): void {
    this.clienteService.getCliente(id).subscribe({
      next: (data) => {
        this.cliente = data.respuesta;
        this.editarClienteForm.patchValue(this.cliente);
      },
      error: (err) => {
        Swal.fire('Error', 'No se pudo cargar la información del cliente.', 'error');
        console.error(err);
      }
    });
  }

  editarCliente(): void {
    if (this.editarClienteForm.valid) {
      const clienteActualizado: Cliente = this.editarClienteForm.value;
      this.clienteService.editarCliente(clienteActualizado).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'El cliente ha sido actualizado correctamente.', 'success');
        },
        error: (err) => {
          Swal.fire('Error', 'No se pudo actualizar el cliente.', 'error');
          console.error(err);
        }
      });
    }
  }
}
