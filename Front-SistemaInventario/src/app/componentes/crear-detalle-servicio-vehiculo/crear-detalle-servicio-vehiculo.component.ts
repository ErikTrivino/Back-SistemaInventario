import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DetalleServicioVehiculoService } from '../../servicios/detalle-servicio-vehiculo.service';
import { VehiculoService } from '../../servicios/vehiculo.service';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-crear-detalle-servicio-vehiculo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './crear-detalle-servicio-vehiculo.component.html'
})
export class CrearDetalleServicioVehiculoComponent implements OnInit {


    formulario!: FormGroup;
  
  vehiculos: any[] = [];
  idServicio!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private detalleSvc: DetalleServicioVehiculoService,
    private vehiculoSvc: VehiculoService
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
    idVehiculo: [null, Validators.required],
    descripcion: ['', Validators.required],
    costo: [0, [Validators.required, Validators.min(0)]],
  });

    this.idServicio = +this.route.snapshot.paramMap.get('idServicio')!;
    this.vehiculoSvc.getVehiculos().subscribe({
      next: data => this.vehiculos = data.respuesta,
      error: err => console.error(err)
    });
  }

  guardar() {
    if (this.formulario.invalid) return;

    const detalle = {
      ...this.formulario.value,
      idServicio: this.idServicio
    };

    this.detalleSvc.crearDetalleServicioVehiculo(detalle).subscribe({
      next: () => this.router.navigate(['/gestion-servicio']),
      error: err => console.error(err)
    });
  }
}
