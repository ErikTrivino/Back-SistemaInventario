import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ServicioService } from '../../servicios/servicio.service';
import { ClienteService } from '../../servicios/cliente.service';
import { UsuarioService } from '../../servicios/usuario.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-servicio',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar-servicio.component.html'
})
export class EditarServicioComponent implements OnInit {
  form!: FormGroup;
  clientes: any[] = [];
  usuarios: any[] = [];
  idServicio!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private servicioService: ServicioService,
    private clienteService: ClienteService,
    private usuarioService: UsuarioService
  ) {
    this.form = this.fb.group({
      idServicio: [''],
      fecha: ['', Validators.required],
      descripcion: ['', Validators.required],
      idCliente: ['', Validators.required],
      idEmpleado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idServicio = +id;
        //this.cargarCliente(this.idCliente);
      }
    });
    //console.log(this.idServicio);

    this.servicioService.getServicio(this.idServicio).subscribe({
      next: d => {
        const s = d.respuesta;
        this.form.patchValue({
          idServicio: s.idServicio,
          fecha: s.fecha?.substring(0,10),
          descripcion: s.descripcion,
          idCliente: s.idCliente,
          idEmpleado: s.idEmpleado
        });
      },
      error: () => Swal.fire('Error', 'No se cargó el servicio', 'error')
    });

    this.clienteService.getClientes().subscribe({
      next: d => this.clientes = d.respuesta.map((c:any) => ({ id:c.idCliente, label:`${c.nombre} - ${c.identificacion}` })),
      error: () => Swal.fire('Error', 'No se cargaron clientes', 'error')
    });
    this.usuarioService.getUsuarios().subscribe({
      next: d => this.usuarios = d.respuesta.map((u:any) => ({ id:u.idUsuario, label:`${u.nombre} - ${u.identificacion}` })),
      error: () => Swal.fire('Error', 'No se cargaron empleados', 'error')
    });
  }

  buscarCliente() {
    const id = this.form.get('idCliente')?.value;
    if (id) { this.clienteService.getCliente(id).subscribe({
        next: d => Swal.fire('Cliente', `${d.respuesta.nombre} ...`, 'info'),
        error: () => Swal.fire('No encontrado', 'Cliente no existe', 'error')
      });
    }
  }

  buscarEmpleado() {
    const id = this.form.get('idEmpleado')?.value;
    if (id) { this.usuarioService.getUsuario(id).subscribe({
        next: d => Swal.fire('Empleado', `${d.respuesta.nombre} ...`, 'info'),
        error: () => Swal.fire('No encontrado', 'Empleado no existe', 'error')
      });
    }
  }

  editar() {
    if (this.form.valid) {
      this.servicioService.editarServicio(this.form.value).subscribe({
        next: () => Swal.fire('Éxito', 'Servicio actualizado', 'success'),
        error: () => Swal.fire('Error', 'No se actualizó', 'error')
      });
    } else {
      Swal.fire('Error', 'Completa los campos requeridos', 'error');
    }
  }
}
