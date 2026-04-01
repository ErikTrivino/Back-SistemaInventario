import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../servicios/producto.service';
import { ProveedorService } from '../../servicios/proveedor.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './editar-producto.component.html'
})
export class EditarProductoComponent implements OnInit {
  form!: FormGroup;
  proveedores: any[] = [];
  idProducto!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private proveedorService: ProveedorService
  ) {
    this.form = this.fb.group({
      
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      singlePrice: [0, [Validators.required, Validators.min(0)]],
      available: [0, [Validators.required, Validators.min(0)]],
      idProveedor: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Cargar ID del producto desde la ruta
    this.idProducto = +(this.route.snapshot.paramMap.get('id') || 0);
    if (this.idProducto) {
      this.productoService.getProducto(this.idProducto).subscribe({
        next: (data) => {
          this.form.patchValue(data.respuesta);
        },
        error: () => Swal.fire('Error', 'No se pudo cargar el producto', 'error')
      });
    }

    // Cargar lista de proveedores
    this.proveedorService.getProveedores().subscribe({
      next: (data) => {
        this.proveedores = data.respuesta.map((prov: any) => ({
          id: prov.idProveedor,
          label: `${prov.nombre} - ${prov.identificacion}`
        }));
      },
      error: () => Swal.fire('Error', 'No se pudo cargar la lista de proveedores', 'error')
    });
  }

  buscarProveedorPorId() {
    const id = this.form.get('idProveedor')?.value;
    if (!id) return;

    this.proveedorService.getProveedor(id).subscribe({
      next: (data) => {
        const prov = data.respuesta;
        Swal.fire('Proveedor encontrado', `${prov.nombre} - ${prov.identificacion}`, 'info');
        this.form.patchValue({ idProveedor: prov.idProveedor });
      },
      error: () => Swal.fire('No encontrado', 'Proveedor no encontrado', 'error')
    });
  }

editar(): void {
  if (this.form.invalid) {
    Swal.fire('Error', 'Revisa los campos obligatorios', 'error');
    return;
  }

  const productoEditado = {
    idProducto: this.idProducto, // ← asegúrate de tenerlo definido en la clase
    nombre: this.form.value.nombre,
    descripcion: this.form.value.descripcion,
    singlePrice: this.form.value.singlePrice,
    available: this.form.value.available,
    idProveedor: this.form.value.idProveedor
  };

  this.productoService.editarProducto(productoEditado).subscribe({
    next: () => Swal.fire('Éxito', 'Producto actualizado', 'success'),
    error: () => Swal.fire('Error', 'No se pudo actualizar el producto', 'error')
  });
}

}
