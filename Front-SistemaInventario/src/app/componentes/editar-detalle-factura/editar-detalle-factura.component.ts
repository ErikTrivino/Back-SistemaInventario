import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ServicioService } from '../../servicios/servicio.service';
import { DetalleFacturaService } from '../../servicios/detalle-factura.service';
import { Servicio } from '../../modelo/servicio/servicio';
import { CommonModule } from '@angular/common';
import { Factura } from '../../modelo/factura/factura';
import { FacturaService } from '../../servicios/factura.service';
import { EditarDetalleFactura } from '../../modelo/editarObjeto';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-editar-detalle-factura',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar-detalle-factura.component.html'
})
export class EditarDetalleFacturaComponent implements OnInit {
  form!: FormGroup;
  servicios: Servicio[] = [];

  facturas: Factura[] = [];
  idDetalle!: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private detalleFacturaService: DetalleFacturaService,
    private servicioService: ServicioService,
    private facturaService:FacturaService,
    private router: Router
  ) {}

  ngOnInit(): void {
   // this.idDetalle = Number(this.route.snapshot.paramMap.get('idDetalle'));

      this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idDetalle = +id;
        ///this.cargarCliente(this.idCliente);
      }
    });
  
    this.form = this.fb.group({
      idFactura: [ Validators.required],
      idServicio: [ Validators.required],
      costServicio: [0, [Validators.required, Validators.min(0.01)]]
    });

    this.servicioService.getServicios().subscribe({
      next: data => this.servicios = data.respuesta,
      error: err => console.error(err)
    });
    this.facturaService.getFacturas().subscribe({
      next: data => this.facturas = data.respuesta,
      error: err => console.error(err)
    });

    this.detalleFacturaService.getDetalleFactura(this.idDetalle).subscribe({
      next: data => this.form.patchValue(data.respuesta),
      error: err => console.error(err)
    });
  }

  guardar() {
    if (this.form.invalid) return;

    const detalle:EditarDetalleFactura = {
      ...this.form.value,
      idDetalleFactura: this.idDetalle
    };

    this.detalleFacturaService.editarDetalleFactura(detalle).subscribe({
      next: () => this.router.navigate(['/gestion-factura']),
      error: err => console.error(err)
    });
  }
}
