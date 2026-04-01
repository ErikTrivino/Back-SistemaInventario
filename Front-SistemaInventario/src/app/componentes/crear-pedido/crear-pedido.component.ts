import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../../servicios/pedido.service';
import { ProveedorService } from '../../servicios/proveedor.service';
import { UsuarioService } from '../../servicios/usuario.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { CrearPedido } from '../../modelo/crearObjetos';

@Component({
  selector: 'app-crear-pedido',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-pedido.component.html',
  styleUrl: './crear-pedido.component.css'
})
export class CrearPedidoComponent implements OnInit {
  form!: FormGroup;
  proveedores: any[] = [];
  empleados: any[] = [];
  esEdicion = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pedidoSvc: PedidoService,
    private proveedorSvc: ProveedorService,
    private usuarioSvc: UsuarioService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      idPedido: [],
      nombrePedido: ['', Validators.required],
      fechaPedido: ['', Validators.required],
      estado: ['', [Validators.required]],
      idProveedor: ['', Validators.required],
      idEmpleado: ['', Validators.required]
    });

    this.cargarProveedores();
    this.cargarEmpleados();

    const id = this.route.snapshot.paramMap.get('idPedido');
    if (id) {
      this.esEdicion = true;
      this.pedidoSvc.getPedido(+id).subscribe({
        next: d => this.form.patchValue(d.respuesta),
        error: () => Swal.fire('Error', 'No se pudo cargar el pedido', 'error')
      });
    }
  }

  cargarProveedores() {
    this.proveedorSvc.getProveedores().subscribe({
      next: d => this.proveedores = d.respuesta,
      error: () => Swal.fire('Error', 'No se pudo cargar proveedores', 'error')
    });
  }

  cargarEmpleados() {
    this.usuarioSvc.getUsuarios().subscribe({
      next: d => this.empleados = d.respuesta,
      error: () => Swal.fire('Error', 'No se pudo cargar empleados', 'error')
    });
  }

guardar(): void {
  if (this.form.invalid) {
    Swal.fire('Error', 'Completa todos los campos correctamente', 'error');
    return;
  }

  console.log(this.form.value.idEmpleado);
  const pedido:CrearPedido = {
    nombrePedido:this.form.value.nombrePedido,
    fechaPedido: this.form.value.fechaPedido,
    estado: this.form.value.estado,
    idProveedor: this.form.value.idProveedor,
    idEmpleado: this.form.value.idEmpleado
  };

  this.pedidoSvc.crearPedido(pedido).subscribe({
    next: () => {
      Swal.fire('Éxito', 'Pedido creado correctamente', 'success');
      this.form.reset();
    },
    error: () => Swal.fire('Error', 'No se pudo crear el pedido', 'error')
  });
}

}