import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FacturaService } from '../../servicios/factura.service';
import { ClienteService } from '../../servicios/cliente.service';
import { UsuarioService } from '../../servicios/usuario.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-factura',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar-factura.component.html'
})
export class EditarFacturaComponent implements OnInit {
  form!: FormGroup;
  idFactura!: number;
  clientes: any[] = [];
  empleados: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private facturaService: FacturaService,
    private clienteService: ClienteService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
   // console.log(this.route.snapshot.paramMap.get('idFactura'));

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idFactura = +id;
        ///this.cargarCliente(this.idCliente);
      }
    });
  
    //this.idFactura = +(this.route.snapshot.paramMap.get('idFactura') || 0);

    this.form = this.fb.group({
      idFactura: [this.idFactura],
      fechaFactura: ['', Validators.required],
      total: [0, [Validators.required, Validators.min(0)]],
      metodoPago: ['', Validators.required],
      idCliente: ['', Validators.required],
      idEmpleado: ['', Validators.required]
    });

    this.cargarClientes();
    this.cargarEmpleados();
    this.cargarFactura();
  }

  cargarFactura(): void {
    this.facturaService.getFactura(this.idFactura).subscribe({
      next: d => {
        const f = d.respuesta;
        this.form.patchValue({
          fechaFactura: f.fechaFactura?.substring(0, 10),
          total: f.total,
          metodoPago: f.metodoPago,
          idCliente: f.idCliente,
          idEmpleado: f.idEmpleado
        });
      },
      error: () => Swal.fire('Error', 'No se pudo cargar la factura', 'error')
    });
  }

  cargarClientes() {
    this.clienteService.getClientes().subscribe({
      next: data => {
        this.clientes = data.respuesta.map((c: any) => ({
          id: c.idCliente,
          label: `${c.nombre} - ${c.identificacion}`
        }));
      },
      error: () => Swal.fire('Error', 'No se cargaron los clientes', 'error')
    });
  }

  cargarEmpleados() {
    this.usuarioService.getUsuarios().subscribe({
      next: data => {
        this.empleados = data.respuesta.map((u: any) => ({
          id: u.idUsuario,
          label: `${u.nombre} - ${u.identificacion}`
        }));
      },
      error: () => Swal.fire('Error', 'No se cargaron los empleados', 'error')
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

  actualizar(): void {
    if (this.form.valid) {
      this.facturaService.editarFactura(this.form.value).subscribe({
        next: () => Swal.fire('Actualizado', 'Factura actualizada correctamente', 'success'),
        error: () => Swal.fire('Error', 'No se pudo actualizar la factura', 'error')
      });
    } else {
      Swal.fire('Error', 'Formulario inválido', 'error');
    }
  }
}
