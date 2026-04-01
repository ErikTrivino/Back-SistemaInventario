import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../servicios/usuario.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InformacionUsuario } from '../../modelo/informacionObjeto';
import { AdministradorService } from '../../servicios/administrador.service';

@Component({
  selector: 'app-gestion-usuario',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestion-usuario.component.html'
})
export class GestionUsuarioComponent implements OnInit {
  usuarios: InformacionUsuario[] = [];
  seleccionados: InformacionUsuario[] = [];
  textoBtnEliminar = '';

  constructor(private svc: UsuarioService) {}

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    this.svc.getUsuarios().subscribe({
      next: data => this.usuarios = data.respuesta,
      error: e => console.error(e)
    });
  }

  seleccionar(u: InformacionUsuario, sel: boolean) {
    sel ? this.seleccionados.push(u) : this.seleccionados.splice(this.seleccionados.indexOf(u), 1);
    this.textoBtnEliminar = `${this.seleccionados.length} usuario${this.seleccionados.length === 1 ? '' : 's'}`;
  }

  confirmarEliminar() {
    Swal.fire({
      title: '¿Eliminar?',
      text: `Se eliminarán ${this.seleccionados.length} usuario(s).`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
    }).then(r => {
      if (r.isConfirmed) this.eliminar();
    });
  }

  eliminar() {
    Promise.all(this.seleccionados.map(u =>
      this.svc.eliminarUsuario(u.idUsuario!).toPromise()
    ))
      .then(() => {
        Swal.fire('Eliminado', 'Usuarios eliminados', 'success');
        this.cargar();
        this.seleccionados = [];
        this.textoBtnEliminar = '';
      })
      .catch(() => Swal.fire('Error', 'No se pudieron eliminar', 'error'));
  }

  trackById(_i: number, u: InformacionUsuario) {
    return u.idUsuario;
  }
}
