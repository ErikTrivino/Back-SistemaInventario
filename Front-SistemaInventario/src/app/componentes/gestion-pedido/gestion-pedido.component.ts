import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../servicios/pedido.service';
import { ProveedorService } from '../../servicios/proveedor.service';
import { UsuarioService } from '../../servicios/usuario.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Proveedor } from '../../modelo/proveedor/proveedor';
import { Usuario } from '../../modelo/usuario/usuario';
import { DetallePedidoService } from '../../servicios/detalle-pedido.service';
import { DetallePedido } from '../../modelo/pedido/detallePedido';
import { Pedido } from '../../modelo/pedido/pedido';

@Component({
  selector: 'app-gestion-pedido',
  standalone: true,
    imports: [CommonModule, RouterModule],
  templateUrl: './gestion-pedido.component.html'
})
export class GestionPedidoComponent implements OnInit {
  pedidos: Pedido[] = [];
  proveedoresMap: Record<number, string> = {};
  usuariosMap: Record<number, string> = {};
    proveedores: Proveedor[] = [];
  usuarios: Usuario[] = [];
  detallePedidoId: number | null = null;
detallesPedido: DetallePedido[] = [];

  constructor(
    private pedidoSvc: PedidoService,
    private proveedorSvc: ProveedorService,
    private usuarioSvc: UsuarioService,
        private detalleService: DetallePedidoService
    
  ) {}

  verDetallesPedido(idPedido: number) {
  this.detallePedidoId = idPedido;

  this.detalleService.getDetallesPedidoByIdPedido(idPedido).subscribe({
    next: (data) => this.detallesPedido = data.respuesta,
    error: (err) => console.error('Error al obtener detalles del pedido', err)
  });
}
  ngOnInit() {
    this.cargar();
    this.cargarProveedores();
    this.cargarUsuarios();
  }

  cargar() {
    this.pedidoSvc.getPedidos().subscribe({
      next: d => this.pedidos = d.respuesta,
      error: e => console.error(e)
    });
  }

  cargarProveedores(): void {
    this.proveedorSvc.getProveedores().subscribe({
      next: data => {
        this.proveedores = data.respuesta;
        this.proveedores.forEach(p => {
          this.proveedoresMap[p.idProveedor] = `${p.nombre} - ${p.identificacion}`;
        });
      },
      error: err => console.error(err)
    });
  }

  cargarUsuarios(): void {
    this.usuarioSvc.getUsuarios().subscribe({
      next: data => {
        this.usuarios = data.respuesta;
        this.usuarios.forEach(u => {
          this.usuariosMap[u.idUsuario] = `${u.nombre} - ${u.identificacion}`;
        });
      },
      error: err => console.error(err)
    });
  }

  trackById(_i: number, p: any) {
    return p.idPedido;
  }
} 