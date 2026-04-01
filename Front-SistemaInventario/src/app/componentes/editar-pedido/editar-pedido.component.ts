import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

import { PedidoService } from '../../servicios/pedido.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { ProveedorService } from '../../servicios/proveedor.service';
import { Usuario } from '../../modelo/usuario/usuario';
import { Proveedor } from '../../modelo/proveedor/proveedor';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-editar-pedido',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [DatePipe],
  templateUrl: './editar-pedido.component.html'
})
export class EditarPedidoComponent implements OnInit {

  form!: FormGroup;
  idPedido!: number;
  usuarios: Usuario[] = [];
  proveedores: Proveedor[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService,
    private proveedorService: ProveedorService,
    private datePipe: DatePipe
  ) {
    this.form = this.fb.group({
      nombrePedido: ['', Validators.required],
      fechaPedido: ['', Validators.required],
      estado: ['', Validators.required],
      idProveedor: ['', Validators.required],
      idEmpleado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtener el ID del pedido de la URL
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idPedido = +id;
        this.cargarPedido(this.idPedido);
      }
    });

    this.cargarUsuarios();
    this.cargarProveedores();
  }

cargarPedido(id: number): void {
  this.pedidoService.getPedido(id).subscribe({
    next: (data) => {
      const pedido = data.respuesta;

      // Formatea la fecha al formato yyyy-MM-dd
      const fechaFormateada = this.datePipe.transform(pedido.fechaPedido, 'yyyy-MM-dd');

      this.form.patchValue({
        nombrePedido: pedido.nombrePedido,
        fechaPedido: fechaFormateada,
        estado: pedido.estado,
        idProveedor: pedido.proveedor?.idProveedor,
        idEmpleado: pedido.empleado?.idUsuario
      });
    },
    error: () => Swal.fire('Error', 'No se pudo cargar el pedido', 'error')
  });
}


  cargarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data.respuesta;
      },
      error: () => Swal.fire('Error', 'No se pudo cargar la lista de usuarios', 'error')
    });
  }

  cargarProveedores(): void {
    this.proveedorService.getProveedores().subscribe({
      next: (data) => {
        this.proveedores = data.respuesta;
      },
      error: () => Swal.fire('Error', 'No se pudo cargar la lista de proveedores', 'error')
    });
  }

  buscarUsuarioPorId(): void {
    const id = this.form.get('idEmpleado')?.value;
    if (!id) return;

    this.usuarioService.getUsuario(id).subscribe({
      next: (data) => {
        const u = data.respuesta;
        Swal.fire('Usuario encontrado', `${u.nombre} - ${u.identificacion}`, 'info');
        this.form.patchValue({ idEmpleado: u.idUsuario });
      },
      error: () => Swal.fire('No encontrado', 'Usuario no encontrado', 'error')
    });
  }

  buscarProveedorPorId(): void {
    const id = this.form.get('idProveedor')?.value;
    if (!id) return;

    this.proveedorService.getProveedor(id).subscribe({
      next: (data) => {
        const p = data.respuesta;
        Swal.fire('Proveedor encontrado', `${p.nombre} - ${p.identificacion}`, 'info');
        this.form.patchValue({ idProveedor: p.idProveedor });
      },
      error: () => Swal.fire('No encontrado', 'Proveedor no encontrado', 'error')
    });
  }

  editar(): void {
    if (this.form.valid) {
      const pedidoEditado = {
        ...this.form.value,
        idPedido: this.idPedido
      };

      this.pedidoService.editarPedido(pedidoEditado).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Pedido actualizado correctamente', 'success');
          this.router.navigate(['/gestion-pedido']);
        },
        error: () => Swal.fire('Error', 'No se pudo actualizar el pedido', 'error')
      });
    } else {
      Swal.fire('Error', 'Revisa los campos obligatorios', 'error');
    }
  }
}
