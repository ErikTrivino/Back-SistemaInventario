import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductoService } from '../../servicios/producto.service';
import { ServicioService } from '../../servicios/servicio.service';
import { DetalleServicioProductoService } from '../../servicios/detalle-servicio-producto.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CrearCliente, CrearDetalleServicioProducto } from '../../modelo/crearObjetos';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-crear-detalle-servicio-producto',
  templateUrl: './crear-detalle-servicio-producto.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class CrearDetalleServicioProductoComponent implements OnInit {
  formulario!: FormGroup;
  productos: any[] = [];
  servicios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private productoSvc: ProductoService,
    private servicioSvc: ServicioService,
    private detalleSvc: DetalleServicioProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      idProducto: ['', Validators.required],
      idServicio: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
    });

    this.cargarProductos();
    this.cargarServicios();
  }

  cargarProductos() {
    this.productoSvc.getProductos().subscribe({
      next: data => this.productos = data.respuesta,
      error: err => console.error(err),
    });
  }

  cargarServicios() {
    this.servicioSvc.getServicios().subscribe({
      next: data => this.servicios = data.respuesta,
      error: err => console.error(err),
    });
  }

  guardar() {
    if (this.formulario.invalid) {
      Swal.fire('Error', 'Complete todos los campos correctamente.', 'warning');
      return;
    }
    const detalle:CrearDetalleServicioProducto = {
      idProducto:this.formulario.value.idProducto,
      idServicio:this.formulario.value.idServicio,
      cantidadUsada:this.formulario.value.cantidad
      
    }

    this.detalleSvc.crearDetalleServicioProducto(detalle).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Detalle creado correctamente.', 'success');
        this.router.navigate(['/gestion-servicio']);
      },
      error: err => {
        console.error(err);
        Swal.fire('Error', 'No se pudo crear el detalle.', 'error');
      },
    });
  }
}
