import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from '../../servicios/producto.service';
import { ProveedorService } from '../../servicios/proveedor.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../servicios/usuario.service';
import { CrearProducto } from '../../modelo/crearObjetos';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-producto.component.html'
})
export class CrearProductoComponent implements OnInit {
  form!: FormGroup;
  proveedores: any[] = [];

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private proveedorService: ProveedorService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      idProveedor: ['']
    });
  }

  ngOnInit(): void {
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

    crear(): void {
    if (this.form.valid) {
      console.log();
      const nuevoProducto: CrearProducto = {
        nombre: this.form.value.nombre,
        descripcion: this.form.value.descripcion,
        singlePrice: this.form.value.precio,
        available: this.form.value.stock,
        idProveedor: this.form.value.idProveedor
      };

      this.productoService.crearProducto(nuevoProducto).subscribe({
        next: () => {
          Swal.fire('Éxito', 'Producto creado', 'success');
          this.form.reset();
        },
        error: () => Swal.fire('Error', 'No se pudo crear el producto', 'error')
      });
    } else {
      Swal.fire('Error', 'Revisa los campos obligatorios', 'error');
    }
  }
}
