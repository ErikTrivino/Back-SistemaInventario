import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DetalleServicioVehiculoService } from '../../servicios/detalle-servicio-vehiculo.service';
import { VehiculoService } from '../../servicios/vehiculo.service';
import { EditarDetalleServicioVehiculo } from '../../modelo/editarObjeto';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-editar-detalle-servicio-vehiculo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './editar-detalle-servicio-vehiculo.component.html'
})
export class EditarDetalleServicioVehiculoComponent implements OnInit {

  form!: FormGroup;

  vehiculos: any[] = [];
  idDetalle!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private detalleSvc: DetalleServicioVehiculoService,
    private vehiculoSvc: VehiculoService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
    //idVehiculo: [{ value: null, disabled: true }, Validators.required],
    idVehiculo: [ Validators.required],
    descripcion: ['', Validators.required],
    idServicio: [0, [Validators.required, Validators.min(0)]],
  });


  this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idDetalle = +id;
        ///this.cargarCliente(this.idCliente);
      }
    });

    //this.idDetalle = +this.route.snapshot.paramMap.get('idDetalle')!;
    this.vehiculoSvc.getVehiculos().subscribe({
      next: data => this.vehiculos = data.respuesta,
      error: err => console.error(err)
    });

    this.detalleSvc.getDetalleServicioVehiculo(this.idDetalle).subscribe({
      next: data => this.form.patchValue(data.respuesta),
      error: err => console.error(err)
    });
  }

  actualizar() {
    if (this.form.invalid) return;
    const detalle:EditarDetalleServicioVehiculo = {
            //  ...this.formulario.value,
              descripcion:this.form.value.descripcion,
              idVehiculo: this.form.value.idVehiculo,
              idServicio: this.form.value.idServicio,
              idDetalleServicioVehiculo: this.idDetalle
            };



    this.detalleSvc.editarDetalleServicioVehiculo(detalle).subscribe({
      next: () => this.router.navigate(['/gestion-servicio']),
      error: err => console.error(err)
    });
  }
}
