import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DetallePedidoService } from '../../servicios/detalle-pedido.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { CrearDetallePedido } from '../../modelo/crearObjetos';
import { ProductoService } from '../../servicios/producto.service';
import { PedidoService } from '../../servicios/pedido.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Pedido } from '../../modelo/pedido/pedido';
import { Producto } from '../../modelo/producto/producto';

@Component({
  standalone: true,
  imports:[CommonModule, ReactiveFormsModule],
  selector: 'app-crear-detalle-pedido',
  templateUrl: './crear-detalle-pedido.component.html',
})
export class CrearDetallePedidoComponent implements OnInit {
  form!: FormGroup;
  idPedido!: number;
  productos: Producto[] = [];
pedidos: Pedido[] = [];


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
        private productoService: ProductoService,
            private pedidoSvc: PedidoService,
        
    
    private detalleService: DetallePedidoService
  ) {}

  ngOnInit(): void {
    //this.idPedido = +this.route.snapshot.paramMap.get('idPedido')!;
    this.form = this.fb.group({
      idProducto: ['', Validators.required],
      idPedido: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precio: [0, [Validators.required, Validators.min(0)]],
    });

    // Obtener productos
  this.productoService.getProductos().subscribe({
    next: data => this.productos = data.respuesta,
    error: err => console.error('Error al cargar productos', err)
  });

  // Obtener pedidos
  this.pedidoSvc.getPedidos().subscribe({
    next: data => this.pedidos = data.respuesta,
    error: err => console.error('Error al cargar pedidos', err)
  });
  }

  guardar() {
    if (this.form.invalid) return;

    const detalle:CrearDetallePedido = {
      idProducto:this.form.value.idProducto,
      cantidad:this.form.value.cantidad,
      precioUnitario:this.form.value.precio,
      idPedido: this.form.value.idPedido
    };

    this.detalleService.crearDetallePedido(detalle).subscribe({
      next: () => {
        Swal.fire('Guardado', 'Detalle creado correctamente', 'success');
        this.router.navigate(['/gestion-pedido']);
      },
      error: () => Swal.fire('Error', 'No se pudo crear', 'error')
    });
  }
}
