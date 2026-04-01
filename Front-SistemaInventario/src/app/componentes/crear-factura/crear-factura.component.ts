import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FacturaService } from '../../servicios/factura.service';
import { ClienteService } from '../../servicios/cliente.service';
import { UsuarioService } from '../../servicios/usuario.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { CrearFactura } from '../../modelo/crearObjetos';

@Component({
  selector: 'app-crear-factura',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-factura.component.html'
})
export class CrearFacturaComponent implements OnInit {
  form!: FormGroup;
  clientes: any[] = [];
  empleados: any[] = [];

  constructor(
    private fb: FormBuilder,
    private facturaService: FacturaService,
    private clienteService: ClienteService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fechaFactura: [new Date().toISOString().substring(0,10), Validators.required],
      total: [0, [Validators.required, Validators.min(0)]],
      metodoPago: ['', Validators.required],
      idCliente: [''],
      idEmpleado: ['']
    });

    this.clienteService.getClientes().subscribe({
      next: data => this.clientes = data.respuesta.map((c:any) => ({
        id: c.idCliente, label: `${c.nombre} - ${c.identificacion}`
      })),
      error: () => Swal.fire('Error', 'No se cargaron Clientes', 'error')
    });

    this.usuarioService.getUsuarios().subscribe({
      next: data => this.empleados = data.respuesta.map((u:any) => ({
        id: u.idUsuario, label: `${u.nombre} - ${u.identificacion}`
      })),
      error: () => Swal.fire('Error', 'No se cargaron Empleados', 'error')
    });
  }

  buscarCliente() {
    const id = this.form.get('idCliente')?.value;
    if (id) this.clienteService.getCliente(id).subscribe({
      next: d => Swal.fire('Cliente', `${d.respuesta.nombre} - ${d.respuesta.identificacion}`, 'info'),
      error: () => Swal.fire('No encontrado', 'Cliente no existe', 'error')
    });
  }

  buscarEmpleado() {
    const id = this.form.get('idEmpleado')?.value;
    if (id) this.usuarioService.getUsuario(id).subscribe({
      next: d => Swal.fire('Empleado', `${d.respuesta.nombre} - ${d.respuesta.identificacion}`, 'info'),
      error: () => Swal.fire('No encontrado', 'Empleado no existe', 'error')
    });
  }

crear(): void {
  if (this.form.invalid) {
    Swal.fire('Error', 'Completa todos los campos', 'error');
    return;
  }

  const factura: CrearFactura = {
    fechaFactura: this.form.value.fechaFactura,
    total: this.form.value.total,
    metodoPago: this.form.value.metodoPago,
    idCliente: this.form.value.idCliente,
    idEmpleado: this.form.value.idEmpleado
  };

  this.facturaService.crearFactura(factura).subscribe({
    next: () => {
      Swal.fire('Éxito', 'Factura creada', 'success');
      this.form.reset();
    },
    error: () => Swal.fire('Error', 'No se creó la factura', 'error')
  });
}

}
