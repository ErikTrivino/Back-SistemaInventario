import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { InventarioService } from '../../servicios/inventario.service';
import { SucursalService } from '../../servicios/sucursal.service';
import { ProveedorService } from '../../servicios/proveedor.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MensajeDTO } from '../../modelo/mensaje-dto';
import { ProductoCrearDTO } from '../../modelo/crearObjetos';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-producto.component.html'
})
export class CrearProductoComponent implements OnInit {
  form!: FormGroup;
  proveedores: any[] = [];
  sucursales: any[] = [];

  constructor(
    private fb: FormBuilder,
    private inventarioService: InventarioService,
    private proveedorService: ProveedorService,
    private sucursalService: SucursalService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: [''],
      sku: ['', [Validators.maxLength(50)]],
      unidadMedidaBase: ['UND', Validators.required],
      activo: [true],
      idProveedor: [null, Validators.required],
      detalleProdcutoCrearDTO: this.fb.array([this.crearDetalleFormGroup()])
    });
  }

  get detalles(): FormArray {
    return this.form.get('detalleProdcutoCrearDTO') as FormArray;
  }

  crearDetalleFormGroup(): FormGroup {
    return this.fb.group({
      precioCostoPromedio: [0, [Validators.required, Validators.min(0)]],
      cantidadInicial: [0, [Validators.required, Validators.min(0)]],
      cantidadMinima: [0, [Validators.required, Validators.min(0)]],
      idSucursal: [1, Validators.required]
    });
  }

  agregarDetalle(): void {
    this.detalles.push(this.crearDetalleFormGroup());
  }

  eliminarDetalle(index: number): void {
    if (this.detalles.length > 1) {
      this.detalles.removeAt(index);
    } else {
      Swal.fire('Atención', 'Debe haber al menos un detalle de inventario', 'warning');
    }
  }

  ngOnInit(): void {
    this.cargarProveedores();
    this.cargarSucursales();
  }

  cargarSucursales(): void {
    this.sucursalService.listar().subscribe({
      next: (data: MensajeDTO) => {
        this.sucursales = data.respuesta;
      },
      error: (err: any) => {
        console.error(err);
        Swal.fire('Error', 'No se pudo cargar la lista de sucursales', 'error');
      }
    });
  }

  cargarProveedores() {
    this.proveedorService.listar().subscribe({
      next: (data: MensajeDTO) => {
        const content = data.respuesta.content || data.respuesta;
        this.proveedores = content.map((prov: any) => ({
          id: prov.id,
          label: prov.razonSocial
        }));
      },
      error: (err: any) => {
        console.error(err);
        Swal.fire('Error', 'No se pudo cargar la lista de proveedores', 'error');
      }
    });
  }

  crear(): void {
    if (this.form.valid) {
      const dto: ProductoCrearDTO = {
        nombre: this.form.value.nombre,
        descripcion: this.form.value.descripcion,
        sku: this.form.value.sku,
        unidadMedidaBase: this.form.value.unidadMedidaBase,
        activo: this.form.value.activo,
        idProveedor: Number(this.form.value.idProveedor),
        detalleProdcutoCrearDTO: this.form.value.detalleProdcutoCrearDTO.map((det: any) => ({
          ...det,
          precioCostoPromedio: Number(det.precioCostoPromedio),
          cantidadInicial: Number(det.cantidadInicial),
          cantidadMinima: Number(det.cantidadMinima),
          idSucursal: Number(det.idSucursal)
        }))
      };

      console.log(dto);
      this.inventarioService.createProduct(dto).subscribe({
        next: (data: MensajeDTO) => {
          Swal.fire('Éxito', 'Producto creado correctamente', 'success');
          this.form.reset({
            nombre: '',
            descripcion: '',
            sku: '',
            unidadMedidaBase: 'UND',
            idProveedor: null,
            activo: true
          });
          // Limpiar FormArray y dejar uno solo
          while (this.detalles.length !== 0) {
            this.detalles.removeAt(0);
          }
          this.detalles.push(this.crearDetalleFormGroup());
        },
        error: (err: any) => {
          console.error(err);
          Swal.fire('Error', 'No se pudo crear el producto', 'error');
        }
      });
    } else {
      Swal.fire('Error', 'Revisa los campos obligatorios', 'error');
    }
  }
}
