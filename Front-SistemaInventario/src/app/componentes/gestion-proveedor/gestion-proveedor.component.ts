import { Component, OnInit } from '@angular/core';
import { ProveedorService } from '../../servicios/proveedor.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InformacionProveedor } from '../../modelo/informacionObjeto';
import { MensajeDTO } from '../../modelo/mensaje-dto';
import { PaginadorComponent } from '../comun/paginador/paginador.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-provider',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginadorComponent, FormsModule],
  templateUrl: './gestion-proveedor.component.html',
})
export class GestionProveedorComponent implements OnInit {
  proveedores: InformacionProveedor[] = [];
  seleccionados: InformacionProveedor[] = [];
  textoBtnAccion = '';

  // Estado de paginación
  paginaActual = 0;
  totalPaginas = 0;
  totalElementos = 0;
  tamanoPagina = 10;

  // Filtros
  mostrarTodos = false;

  constructor(private svc: ProveedorService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    const observer = {
      next: (data: MensajeDTO) => {
        if (data.respuesta.content) {
          this.proveedores = data.respuesta.content;
          this.totalElementos = data.respuesta.totalElements;
          this.totalPaginas = data.respuesta.totalPages;
          this.paginaActual = data.respuesta.number;
        } else {
          this.proveedores = data.respuesta;
          this.totalElementos = this.proveedores.length;
          this.totalPaginas = 1;
        }
      },
      error: (e: any) => console.error(e),
    };

    if (this.mostrarTodos) {
      this.svc.listarTodos(this.paginaActual + 1, this.tamanoPagina).subscribe(observer);
    } else {
      this.svc.listar(this.paginaActual + 1, this.tamanoPagina).subscribe(observer);
    }
  }

  onCambioPagina(p: number) {
    this.paginaActual = p;
    this.cargar();
  }

  onCambioTamano(t: number) {
    this.tamanoPagina = t;
    this.paginaActual = 0;
    this.cargar();
  }

  toggleMostrarTodos() {
    this.mostrarTodos = !this.mostrarTodos;
    this.paginaActual = 0;
    this.cargar();
  }

  seleccionar(item: InformacionProveedor, sel: boolean) {
    if (sel) {
      if (!this.seleccionados.includes(item)) {
        this.seleccionados.push(item);
      }
    } else {
      const index = this.seleccionados.indexOf(item);
      if (index !== -1) {
        this.seleccionados.splice(index, 1);
      }
    }
    this.textoBtnAccion = `${this.seleccionados.length} proveedor${this.seleccionados.length === 1 ? '' : 'es'}`;
  }

  toggleEstadoSelec() {
    const promises = this.seleccionados.map(p => this.svc.toggleEstado(p.id).toPromise());

    Promise.all(promises)
      .then(() => {
        Swal.fire('Procesado', 'El estado de los proveedores ha sido actualizado', 'success');
        this.cargar();
        this.seleccionados = [];
        this.textoBtnAccion = '';
      })
      .catch((err: any) => {
        console.error(err);
        Swal.fire('Error', 'No se pudo actualizar el estado de algunos proveedores', 'error');
      });
  }

  trackById(_i: number, p: InformacionProveedor) {
    return p.id;
  }
}
