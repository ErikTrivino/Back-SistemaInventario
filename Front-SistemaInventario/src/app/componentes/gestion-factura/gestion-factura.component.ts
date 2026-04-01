import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../servicios/factura.service';
import { ClienteService } from '../../servicios/cliente.service';
import { UsuarioService } from '../../servicios/usuario.service';

import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InformacionFactura } from '../../modelo/informacionObjeto';
import { Cliente } from '../../modelo/cliente/cliente';
import { Usuario } from '../../modelo/usuario/usuario';
import { DetalleFacturaService } from '../../servicios/detalle-factura.service';
import { DetalleFactura } from '../../modelo/factura/detalleFactura';

@Component({
  selector: 'app-gestion-factura',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestion-factura.component.html'
})
export class GestionFacturaComponent implements OnInit {
  facturas: InformacionFactura[] = [];
  seleccionados: InformacionFactura[] = [];
  textoBtnEliminar = '';

  clientes: Cliente[] = [];
usuarios: Usuario[] = [];
  clientesMap: Record<number, string> = {};
  empleadosMap: Record<number, string> = {};

  detalleFacturaIdFactura: number | null = null;
detallesFactura: DetalleFactura[] = [];

  constructor(
    private facturaService: FacturaService,
    private clienteService: ClienteService,
    private detalleFacturaService: DetalleFacturaService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    this.cargarFacturas();
    this.cargarClientes();
    this.cargarEmpleados();
  }


  verDetallesFactura(idFactura: number) {
  this.detalleFacturaIdFactura = idFactura;
  //console.log(idFactura);
  this.detalleFacturaService.getDetallesFacturaByIdFactura(this.detalleFacturaIdFactura).subscribe({
    next: data => this.detallesFactura = data.respuesta,
    error: err => console.error(err)
  });
}

  cargarFacturas() {
    this.facturaService.getFacturas().subscribe({
      next: data => this.facturas = data.respuesta,
      error: err => console.error(err)
    });
  }

cargarClientes() {
  this.clienteService.getClientes().subscribe({
    next: data => {
      this.clientes = data.respuesta;
      this.clientes.forEach(c => {
        this.clientesMap[c.idCliente!] = `${c.nombre} - ${c.identificacion}`;
      });
    },
    error: e => console.error(e)
  });
}

cargarEmpleados() {
  this.usuarioService.getUsuarios().subscribe({
    next: data => {
      this.usuarios = data.respuesta;
      this.usuarios.forEach(u => {
        this.empleadosMap[u.idUsuario!] = `${u.nombre} - ${u.identificacion}`;
      });
    },
    error: e => console.error(e)
  });
}
  seleccionar(f: InformacionFactura, sel: boolean) {
    sel ? this.seleccionados.push(f)
        : this.seleccionados.splice(this.seleccionados.indexOf(f), 1);
    this.textoBtnEliminar = `${this.seleccionados.length} factura${this.seleccionados.length !== 1 ? 's' : ''}`;
  }

  confirmarEliminar() {
    Swal.fire({
      title: '¿Eliminar?',
      text: `Se eliminarán ${this.seleccionados.length} factura(s).`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then(res => {
      if (res.isConfirmed) this.eliminar();
    });
  }

  eliminar() {
    Promise.all(this.seleccionados.map(f =>
      this.facturaService.eliminarFactura(f.idFactura!).toPromise()
    )).then(() => {
      Swal.fire('Eliminadas', 'Facturas eliminadas correctamente.', 'success');
      this.cargarFacturas();
      this.seleccionados = [];
      this.textoBtnEliminar = '';
    }).catch(() => Swal.fire('Error', 'No se pudo eliminar.', 'error'));
  }

  trackById(_i: number, f: InformacionFactura) {
    return f.idFactura;
  }
}
