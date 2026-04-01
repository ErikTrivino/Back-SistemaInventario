import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicioService } from '../../servicios/servicio.service';
import { DetalleFacturaService } from '../../servicios/detalle-factura.service';
import { Servicio } from '../../modelo/servicio/servicio';
import { Factura } from '../../modelo/factura/factura';
import { FacturaService } from '../../servicios/factura.service';
import { DetalleFactura } from '../../modelo/factura/detalleFactura';
import { CrearDetalleFactura } from '../../modelo/crearObjetos';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-crear-detalle-factura',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crear-detalle-factura.component.html'
})
export class CrearDetalleFacturaComponent implements OnInit {
  form!: FormGroup;
  servicios: Servicio[] = [];
  idFactura!: number;
    facturas: Factura[] = [];
  //etalle!:DetalleFactura;

  constructor(
    private fb: FormBuilder,
    private servicioService: ServicioService,
    private detalleFacturaService: DetalleFacturaService,
    private facturaService:FacturaService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //this.idFactura = Number(this.route.snapshot.paramMap.get('idFactura'));
    this.form = this.fb.group({
      idServicio: [null, Validators.required],
      idFactura: [null, Validators.required],
      costo: [0, [Validators.required, Validators.min(0.01)]]
    });

    this.facturaService.getFacturas().subscribe({
      next: data => this.facturas = data.respuesta,
      error: err => console.error(err)
    });

    this.servicioService.getServicios().subscribe({
      next: data => this.servicios = data.respuesta,
      error: err => console.error(err)
    });
  }

  guardar() {
    if (this.form.invalid) return;

    const detalle: CrearDetalleFactura = {
    
    idServicio: this.form.value.idServicio,
    idFactura: this.form.value.idFactura,
    costServicio: this.form.value.costo
  };

    
    this.detalleFacturaService.crearDetalleFactura(detalle).subscribe({
      next: () => this.router.navigate(['/gestion-factura']),
      error: err => console.error(err)
    });
  }
}
