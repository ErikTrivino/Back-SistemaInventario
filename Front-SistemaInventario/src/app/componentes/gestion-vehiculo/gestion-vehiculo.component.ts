import { Component, OnInit } from '@angular/core';
import { VehiculoService } from '../../servicios/vehiculo.service';
import { ClienteService } from '../../servicios/cliente.service';

import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InformacionVehiculo } from '../../modelo/informacionObjeto';
import { Cliente } from '../../modelo/cliente/cliente';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-gestion-vehiculo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestion-vehiculo.component.html'
})
export class GestionVehiculoComponent implements OnInit {
  vehiculos: InformacionVehiculo[] = [];
  clientes: Cliente[] = [];
  clientesMap: Record<number, string> = {};
  seleccionados: InformacionVehiculo[] = [];
  textoBtnEliminar = '';

  constructor(
    private svc: VehiculoService,
    private clienteSvc: ClienteService
  ) {}

  ngOnInit() {
    this.cargar();
    this.cargarClientes();
  }

  cargar() {
    this.svc.getVehiculos().subscribe({
      next: data => this.vehiculos = data.respuesta,
      error: e => console.error(e)
    });
  }

  cargarClientes() {
    this.clienteSvc.getClientes().subscribe({
      next: data => {
        this.clientes = data.respuesta;
        this.clientes.forEach(c =>
          this.clientesMap[c.idCliente!] = `${c.nombre} - ${c.identificacion}`
        );
      },
      error: e => console.error(e)
    });
  }

  seleccionar(v: InformacionVehiculo, sel: boolean) {
    sel ? this.seleccionados.push(v) : this.seleccionados.splice(this.seleccionados.indexOf(v), 1);
    this.textoBtnEliminar = `${this.seleccionados.length} vehículo${this.seleccionados.length === 1 ? '' : 's'}`;
  }

  confirmarEliminar() {
    Swal.fire({
      title: '¿Eliminar?',
      text: `Se eliminarán ${this.seleccionados.length} vehículo(s).`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
    }).then(r => {
      if (r.isConfirmed) this.eliminar();
    });
  }

  eliminar() {
    Promise.all(this.seleccionados.map(v =>
      this.svc.eliminarVehiculo(v.idVehiculo!).toPromise()
    ))
      .then(() => {
        Swal.fire('Eliminado', 'Vehículos eliminados', 'success');
        this.cargar();
        this.seleccionados = [];
        this.textoBtnEliminar = '';
      })
      .catch(() => Swal.fire('Error', 'No se pudieron eliminar', 'error'));
  }

  trackById(_i: number, v: InformacionVehiculo) {
    return v.idVehiculo;
  }
}
