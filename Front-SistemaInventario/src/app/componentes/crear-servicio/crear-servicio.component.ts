import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ServicioService } from '../../servicios/servicio.service';
import { ClienteService } from '../../servicios/cliente.service';
import { UsuarioService } from '../../servicios/usuario.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-servicio',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-servicio.component.html'
})
export class CrearServicioComponent implements OnInit {
  form!: FormGroup;
  clientes: any[] = [];
  usuarios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private servicioService: ServicioService,
    private clienteService: ClienteService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      fecha: [new Date().toISOString().substring(0,10), Validators.required],
      descripcion: ['', Validators.required],
      idCliente: ['', Validators.required],
      idEmpleado: ['', Validators.required]
    });

    this.clienteService.getClientes().subscribe({
      next: data => this.clientes = data.respuesta.map((c:any) => ({ id: c.idCliente, label: `${c.nombre} - ${c.identificacion}` })),
      error: () => Swal.fire('Error', 'No se pudieron cargar Clientes', 'error')
    });

    this.usuarioService.getUsuarios().subscribe({
      next: data => this.usuarios = data.respuesta.map((u:any) => ({ id: u.idUsuario, label: `${u.nombre} - ${u.identificacion}` })),
      error: () => Swal.fire('Error', 'No se pudieron cargar Usuarios', 'error')
    });
  }

  buscarCliente() {
    const id = this.form.get('idCliente')?.value;
    if (id) {
      this.clienteService.getCliente(id).subscribe({
        next: d => Swal.fire('Cliente', `${d.respuesta.nombre} - ${d.respuesta.identificacion}`, 'info'),
        error: () => Swal.fire('No encontrado', 'Cliente no existe', 'error')
      });
    }
  }

  buscarEmpleado() {
    const id = this.form.get('idEmpleado')?.value;
    if (id) {
      this.usuarioService.getUsuario(id).subscribe({
        next: d => Swal.fire('Empleado', `${d.respuesta.nombre} - ${d.respuesta.identificacion}`, 'info'),
        error: () => Swal.fire('No encontrado', 'Empleado no existe', 'error')
      });
    }
  }

  crear() {
    if (this.form.valid) {
      this.servicioService.crearServicio(this.form.value).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Servicio creado', 'success');
          this.form.reset();
        },
        error: () => Swal.fire('Error', 'No se creó el servicio', 'error')
      });
    } else {
      Swal.fire('Error', 'Completa todos los datos', 'error');
    }
  }
}
