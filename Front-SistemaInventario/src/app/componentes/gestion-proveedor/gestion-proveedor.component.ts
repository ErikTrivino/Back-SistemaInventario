import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../../servicios/proveedor.service';

import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InformacionProveedor } from '../../modelo/informacionObjeto';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-gestion-proveedor',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestion-proveedor.component.html',
})
export class GestionProveedorComponent implements OnInit {
  proveedores: InformacionProveedor[] = [];
  seleccionados: InformacionProveedor[] = [];
  textoBtnEliminar = '';

  constructor(private svc: ProveedorService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.svc.getProveedores().subscribe({
      next: (data) => (this.proveedores = data.respuesta),
      error: (e) => console.error(e),
    });
  }

  seleccionar(item: InformacionProveedor, sel: boolean) {
    sel ? this.seleccionados.push(item) : this.seleccionados.splice(this.seleccionados.indexOf(item), 1);
    this.textoBtnEliminar = `${this.seleccionados.length} proveedor${this.seleccionados.length === 1 ? '' : 'es'}`;
  }

  confirmarEliminar() {
    Swal.fire({
      title: '¿Eliminar?',
      text: `Se eliminarán ${this.seleccionados.length} proveedor(es).`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
    }).then((r) => {
      if (r.isConfirmed) this.eliminarSelec();
    });
  }

  eliminarSelec() {
    Promise.all(this.seleccionados.map(p => this.svc.eliminarProveedor(p.idProveedor).toPromise()))
      .then(() => {
        Swal.fire('Eliminado', 'Proveedores eliminados exitosamente', 'success');
        this.cargar();
        this.seleccionados = [];
        this.textoBtnEliminar = '';
      })
      .catch(err => Swal.fire('Error', 'No se pudo eliminar uno o más proveedores', 'error'));
  }

  trackById(_i: number, p: InformacionProveedor) {
    return p.idProveedor;
  }
}
