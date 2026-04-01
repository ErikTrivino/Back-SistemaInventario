import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ProductoService } from '../../servicios/producto.service';
import { ServicioService } from '../../servicios/servicio.service';
import { DetalleServicioProductoService } from '../../servicios/detalle-servicio-producto.service';
import { CommonModule } from '@angular/common';
import { EditarDetalleServicioProducto } from '../../modelo/editarObjeto';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-editar-detalle-servicio-producto',
  templateUrl: './editar-detalle-servicio-producto.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],

})
export class EditarDetalleServicioProductoComponent implements OnInit {
  formulario!: FormGroup;
  idDetalle!: number;
  productos: any[] = [];
  servicios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productoSvc: ProductoService,
    private servicioSvc: ServicioService,
    private detalleSvc: DetalleServicioProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idDetalle = +id;
        ///this.cargarCliente(this.idCliente);
      }
    });
    //this.idDetalle = +this.route.snapshot.paramMap.get('id')!;
    this.formulario = this.fb.group({
      idProducto: ['', Validators.required],
      idServicio: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
    });

    this.cargarProductos();
    this.cargarServicios();
    this.cargarDetalle();
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

  cargarDetalle() {
    this.detalleSvc.getDetalleServicioProductoById(this.idDetalle).subscribe({
      next: data => this.formulario.patchValue(data.respuesta),
      error: err => {
        console.error(err);
        Swal.fire('Error', 'No se pudo cargar el detalle.', 'error');
      },
    });
  }

  guardar() {
    if (this.formulario.invalid) {
      Swal.fire('Error', 'Complete todos los campos correctamente.', 'warning');
      return;
    }

    console.log(this.idDetalle)
    const detalle:EditarDetalleServicioProducto = {
        //  ...this.formulario.value,
          cantidadUsada:this.formulario.value.cantidad,
          idProducto: this.formulario.value.idProducto,
          idServicio: this.formulario.value.idServicio,
          idDetalleServicioProducto: this.idDetalle
        };

   

    this.detalleSvc.editarDetalleServicioProducto(detalle).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Detalle actualizado correctamente.', 'success');
        this.router.navigate(['/gestion-servicio']);
      },
      error: err => {
        console.error(err);
        Swal.fire('Error', 'No se pudo actualizar el detalle.', 'error');
      },
    });
  }
}
