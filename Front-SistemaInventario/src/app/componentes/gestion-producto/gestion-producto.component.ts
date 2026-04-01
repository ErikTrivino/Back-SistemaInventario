import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../servicios/producto.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InformacionProducto } from '../../modelo/informacionObjeto';
import { ProveedorService } from '../../servicios/proveedor.service';
import { UsuarioService } from '../../servicios/usuario.service';


@Component({
  selector: 'app-gestion-producto',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestion-producto.component.html'
})
export class GestionProductoComponent implements OnInit {
 productos: InformacionProducto[] = [];
  seleccionados: InformacionProducto[] = [];
  textoBtnEliminar = '';

  constructor(
    private productoService: ProductoService,
    private proveedorService: ProveedorService
  ) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar() {
    this.productoService.getProductos().subscribe({
      next: data => {
        this.productos = data.respuesta;

        // Buscar nombre del proveedor para cada producto
        for (let prod of this.productos) {
          this.proveedorService.getProveedor(prod.idProveedor).subscribe({
            next: prov => {
              prod.nombreProveedor = prov.respuesta.nombre;
            },
            error: () => {
              prod.nombreProveedor = 'Desconocido';
            }
          });
        }
      },
      error: err => console.error(err)
    });
  }

  seleccionar(p: InformacionProducto, sel: boolean) {
    sel ? this.seleccionados.push(p) : this.seleccionados.splice(this.seleccionados.indexOf(p), 1);
    this.textoBtnEliminar = `${this.seleccionados.length} producto${this.seleccionados.length !== 1 ? 's' : ''}`;
  }

  confirmarEliminar() {
    Swal.fire({
      title: '¿Eliminar?',
      text: `Se eliminarán ${this.seleccionados.length} producto(s).`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar'
    }).then(result => {
      if (result.isConfirmed) this.eliminar();
    });
  }

  eliminar() {
    Promise.all(this.seleccionados.map(p =>
      this.productoService.eliminarProducto(p.idProducto!).toPromise()
    ))
    .then(() => {
      Swal.fire('Eliminado', 'Productos eliminados correctamente', 'success');
      this.cargar();
      this.seleccionados = [];
      this.textoBtnEliminar = '';
    })
    .catch(() => Swal.fire('Error', 'No se pudo eliminar', 'error'));
  }

  trackById(_i: number, p: InformacionProducto) {
    return p.idProducto;
  }
}
