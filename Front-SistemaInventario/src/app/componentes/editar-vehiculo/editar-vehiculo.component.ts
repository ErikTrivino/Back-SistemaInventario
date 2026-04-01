import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { VehiculoService } from '../../servicios/vehiculo.service';
import { ClienteService } from '../../servicios/cliente.service';
import Swal from 'sweetalert2';
import { Cliente } from '../../modelo/cliente/cliente';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-editar-vehiculo',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule,CommonModule],
  templateUrl: './editar-vehiculo.component.html'
})
export class EditarVehiculoComponent implements OnInit {
  form!: FormGroup;
  clientes: Cliente[] = [];
  idVehiculo!: number;

  constructor(
    private fb: FormBuilder,
    private svc: VehiculoService,
    private clienteSvc: ClienteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      idVehiculo: [''],
      matricula: ['', Validators.required],
      modelo: ['', Validators.required],
      description: ['', Validators.required],
      idCliente: [null, Validators.required]
    });
        this.form.addControl('buscarIdCliente', this.fb.control(''));

    this.clienteSvc.getClientes().subscribe({
      next: data => this.clientes = data.respuesta,
      error: e => console.error(e)
    });

    this.route.paramMap.subscribe(params => {
      const v = params.get('id');
      if (v) {
        this.idVehiculo = +v;
        this.svc.getVehiculo(this.idVehiculo).subscribe({
          next: data => this.form.patchValue(data.respuesta),
          error: () => Swal.fire('Error', 'No se cargó el vehículo', 'error')
        });
      }
    });
  }

  editar() {
    if (this.form.valid) {
      this.svc.editarVehiculo(this.form.value).subscribe({
        next: () => Swal.fire('Actualizado', 'Vehículo actualizado', 'success'),
        error: () => Swal.fire('Error', 'No se actualizó', 'error')
      });
    }
  }

buscarCliente() {
  const id = this.form.get('buscarIdCliente')?.value;
  if (id) {
    this.clienteSvc.getCliente(id).subscribe({
      next: data => {
        // Mostrar información
        Swal.fire('Cliente', `Seleccionado: ${data.respuesta.nombre} - ${data.respuesta.identificacion}`, 'info');
        
        // Establecer el idCliente en el form-select
        this.form.get('idCliente')?.setValue(data.respuesta.idCliente);
      },
      error: () => {
        Swal.fire('Error', 'No se encontró el cliente', 'error');
        this.form.get('idCliente')?.setValue(null); // Limpia el select si hay error
      }
    });
  }
}
}
