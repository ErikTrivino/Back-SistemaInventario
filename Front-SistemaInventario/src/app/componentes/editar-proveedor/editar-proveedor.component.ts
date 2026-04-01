import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProveedorService } from '../../servicios/proveedor.service';
import Swal from 'sweetalert2';
import { InformacionProveedor } from '../../modelo/informacionObjeto';
import { EditarProveedor } from '../../modelo/editarObjeto';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-editar-proveedor',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './editar-proveedor.component.html'
})
export class EditarProveedorComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  proveedor!: EditarProveedor;

  constructor(
    private fb: FormBuilder,
    private svc: ProveedorService,
    private route: ActivatedRoute
  ) {
    this.form = fb.group({
      nombre: ['', Validators.required],
      identificacion: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const val = params.get('id');
      console.log(val);
      if (val) {
        this.id = +val;
        this.svc.getProveedor(this.id).subscribe({
          next: data => {
            this.proveedor = data.respuesta;
            this.form.patchValue(this.proveedor);
          },
          error: () => Swal.fire('Error', 'No se cargó el proveedor', 'error')
        });
      }
    });
  }

editar() {
  if (this.form.valid) {
    const proveedorEditado: EditarProveedor = {
      idProveedor: this.id,
      nombre: this.form.value.nombre,
      identificacion: this.form.value.identificacion,
      telefono: this.form.value.telefono,
      correo: this.form.value.correo
    };

    this.svc.editarProveedor(proveedorEditado).subscribe({
      next: () => Swal.fire('Actualizado', 'Proveedor actualizado', 'success'),
      error: () => Swal.fire('Error', 'No se actualizó el proveedor', 'error')
    });
  }
}

}
