import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../servicios/servicio.service';
import { ClienteService } from '../../servicios/cliente.service';
import { UsuarioService } from '../../servicios/usuario.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InformacionServicio } from '../../modelo/informacionObjeto';
import { Cliente } from '../../modelo/cliente/cliente';
import { Usuario } from '../../modelo/usuario/usuario';
import { DetalleServicioProductoService } from '../../servicios/detalle-servicio-producto.service';
import { DetalleServicioProducto } from '../../modelo/servicio/detalleServicioProducto';
import { DetalleServicioVehiculo } from '../../modelo/servicio/detalleServicioVehiculo';
import { DetalleServicioVehiculoService } from '../../servicios/detalle-servicio-vehiculo.service';

@Component({
  selector: 'app-gestion-servicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestion-servicio.component.html'
})
export class GestionServicioComponent implements OnInit {
  servicios: InformacionServicio[] = [];
  seleccionados: InformacionServicio[] = [];
  textoBtnEliminar = '';
  clientes: Cliente[] = [];
  usuarios: Usuario[]=[];

  detalleServicioId: number | null = null;
  detalles: DetalleServicioProducto[] = [];
    // 🔧 NUEVOS DETALLES VEHÍCULO
  detallesVehiculo: DetalleServicioVehiculo[] = [];
  

  clientesMap: Record<number, string> = {};
  empleadosMap: Record<number, string> = {};

  constructor(
    private servicioService: ServicioService,
    private clienteService: ClienteService,
    private usuarioService: UsuarioService,
    private detalleServicioProductoSvc: DetalleServicioProductoService,
    private detalleServicioVehiculoSvc: DetalleServicioVehiculoService

  ) {}

  ngOnInit(): void {
    this.cargar();
    this.cargarClientes();
    this.cargarEmpleados();
  }

    verDetalles(idServicio: number) {
    if (this.detalleServicioId === idServicio) {
      this.detalleServicioId = null;
      this.detalles = [];
      this.detallesVehiculo = [];
      return;
    }

    this.detalleServicioId = idServicio;

    this.detalleServicioProductoSvc.getDetalleServicioProductoByIdServicio(idServicio).subscribe({
      next: data => this.detalles = data.respuesta,
      error: err => {
        console.error(err);
        Swal.fire('Error', 'No se pudieron cargar los detalles de productos', 'error');
      }
    });

    this.detalleServicioVehiculoSvc.getDetalleServicioVehiculoByIdServicio(idServicio).subscribe({
      
      next: data => this.detallesVehiculo = data.respuesta,
      
      
      error: err => {
        console.error(err);
        Swal.fire('Error', 'No se pudieron cargar los detalles de vehículos', 'error');
      }
    });
  }


  cargar() {
    this.servicioService.getServicios().subscribe({
      next: data => this.servicios = data.respuesta,
      error: err => console.error(err)
    });
  }

  cargarClientes() {
    this.clienteService.getClientes().subscribe({
      next: data => {
      this.clientes = data.respuesta;

        this.clientes.forEach(c => 
          this.clientesMap[c.idCliente!] = `${c.nombre} - ${c.identificacion}`
        );
      },
      error: e => console.error(e)
    });
  }

  cargarEmpleados() {
    this.usuarioService.getUsuarios().subscribe({
      next: data => {
              this.usuarios = data.respuesta;

        this.usuarios.forEach(u => 
          this.empleadosMap[u.idUsuario!] = `${u.nombre} - ${u.identificacion}`
        );
      },
      error: e => console.error(e)
    });
  }

  seleccionar(s: InformacionServicio, sel: boolean) {
    sel ? this.seleccionados.push(s) : this.seleccionados.splice(this.seleccionados.indexOf(s), 1);
    this.textoBtnEliminar = `${this.seleccionados.length} servicio${this.seleccionados.length !== 1 ? 's' : ''}`;
  }

  confirmarEliminar() {
    Swal.fire({
      title: '¿Eliminar?',
      text: `Se eliminarán ${this.seleccionados.length} servicio(s).`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then(result => {
      if (result.isConfirmed) this.eliminar();
    });
  }

  eliminar() {
    Promise.all(this.seleccionados.map(s =>
      this.servicioService.eliminarServicio(s.idServicio!).toPromise()
    )).then(() => {
      Swal.fire('Eliminado', 'Servicios eliminados', 'success');
      this.cargar();
      this.seleccionados = [];
      this.textoBtnEliminar = '';
    }).catch(() => Swal.fire('Error', 'No se pudo eliminar', 'error'));
  }

  trackById(_i: number, s: InformacionServicio) {
    return s.idServicio;
  }
}
