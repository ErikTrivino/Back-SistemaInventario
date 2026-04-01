import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DetallePedidoService } from '../../servicios/detalle-pedido.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { EditarDetallePedido } from '../../modelo/editarObjeto';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
    standalone: true,

  imports:[CommonModule, ReactiveFormsModule],
  selector: 'app-editar-detalle-pedido',
  templateUrl: './editar-detalle-pedido.component.html',
})
export class EditarDetallePedidoComponent implements OnInit {
  form!: FormGroup;
  idDetalle!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private detalleService: DetallePedidoService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idDetalle = +id;
        ///this.cargarCliente(this.idCliente);
      }
    });
    ///this.idDetalle = +this.route.snapshot.paramMap.get('idDetalle')!;
    this.form = this.fb.group({
      idProducto: ['', Validators.required],
      idPedido: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precioUnitario: [0, [Validators.required, Validators.min(0)]],
    });

    this.detalleService.getDetallePedido(this.idDetalle).subscribe({
      next: data => this.form.patchValue(data.respuesta),
      error: () => Swal.fire('Error', 'No se pudo cargar el detalle', 'error')
    });
  }

  guardar() {
    if (this.form.invalid) return;

  
    const detalle:EditarDetallePedido = {
          idDetallePedido:this.idDetalle,
          cantidad:this.form.value.cantidad,
          precioUnitario:this.form.value.precioUnitario,
          idPedido: this.form.value.idPedido,
          idProducto: this.form.value.idProducto
        };



    this.detalleService.editarDetallePedido(detalle).subscribe({
      next: () => {
        Swal.fire('Actualizado', 'Detalle actualizado correctamente', 'success');
        this.router.navigate(['/gestion-pedido']);
      },
      error: () => Swal.fire('Error', 'No se pudo actualizar', 'error')
    });
  }
}
