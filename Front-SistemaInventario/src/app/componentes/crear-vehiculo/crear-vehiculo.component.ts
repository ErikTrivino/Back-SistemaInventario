import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { VehiculoService } from '../../servicios/vehiculo.service';
import { ClienteService } from '../../servicios/cliente.service';
import Swal from 'sweetalert2';
import { Cliente } from '../../modelo/cliente/cliente';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-crear-vehiculo',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './crear-vehiculo.component.html'
})
export class CrearVehiculoComponent implements OnInit {
  form!: FormGroup;
  clientes: Cliente[] = [];

  constructor(
    private fb: FormBuilder,
    private svc: VehiculoService,
    private clienteSvc: ClienteService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      matricula: ['', Validators.required],
      modelo: ['', Validators.required],
      description: ['', Validators.required],
      idCliente: [null]
    });
    this.form.addControl('buscarIdCliente', this.fb.control(''));

    this.clienteSvc.getClientes().subscribe({
      next: data => this.clientes = data.respuesta,
      error: e => console.error(e)
    });
    
  }

  crear() {
    if (this.form.valid) {
      this.svc.crearVehiculo(this.form.value).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Vehículo creado', 'success');
          this.form.reset();
        },
        error: () => Swal.fire('Error', 'No se pudo crear', 'error')
      });
    } else {
      Swal.fire('Error', 'Completa los datos', 'error');
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
