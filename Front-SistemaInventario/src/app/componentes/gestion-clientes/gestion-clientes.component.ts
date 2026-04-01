import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../servicios/cliente.service';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Cliente } from '../../modelo/cliente/cliente';

import Swal from 'sweetalert2';
import { UsuarioService } from '../../servicios/usuario.service';
@Component({
  selector: 'app-gestion-clientes',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestion-clientes.component.html',
  styleUrl: './gestion-clientes.component.css'
})
export class GestionClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  clientesSeleccionados: Cliente[] = [];
  textoBtnEliminar: string = '';

  constructor(private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes = data.respuesta;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  seleccionarCliente(cliente: Cliente, seleccionado: boolean) {
    if (seleccionado) {
      this.clientesSeleccionados.push(cliente);
    } else {
      const index = this.clientesSeleccionados.indexOf(cliente);
      if (index !== -1) {
        this.clientesSeleccionados.splice(index, 1);
      }
    }
    this.actualizarMensaje();
  }

  actualizarMensaje() {
    const cantidad = this.clientesSeleccionados.length;
    this.textoBtnEliminar = cantidad === 1 ? '1 cliente' : `${cantidad} clientes`;
  }

  confirmarEliminacion() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará los clientes seleccionados permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.eliminarClientes();
      }
    });
  }

  eliminarClientes() {
    const peticiones = this.clientesSeleccionados.map((cliente) =>
      this.clienteService.eliminarCliente(cliente.idCliente).toPromise()
    );

    Promise.all(peticiones)
      .then(() => {
        this.cargarClientes();
        this.clientesSeleccionados = [];
        this.actualizarMensaje();
        Swal.fire('Eliminados', 'Los clientes han sido eliminados.', 'success');
      })
      .catch((error) => {
        console.error('Error al eliminar clientes:', error);
        Swal.fire('Error', 'Ocurrió un problema al eliminar los clientes.', 'error');
      });
  }

  trackById(index: number, item: Cliente): number {
    return item.idCliente;
  }
}
