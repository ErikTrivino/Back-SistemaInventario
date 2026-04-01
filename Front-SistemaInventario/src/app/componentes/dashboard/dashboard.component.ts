import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../servicios/cliente.service';
import { ProductoService } from '../../servicios/producto.service';
import { FacturaService } from '../../servicios/factura.service';
import { PedidoService } from '../../servicios/pedido.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  totalClientes: number = 0;
  totalProductos: number = 0;
  totalFacturas: number = 0;
  totalPedidos: number = 0;

  constructor(
    private clienteService: ClienteService,
    private productoService: ProductoService,
    private facturaService: FacturaService,
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
    //this.cargarMetricas();
  }

  cargarMetricas(): void {
    this.clienteService.getClientes().subscribe(data => {
      this.totalClientes = data.respuesta ? data.respuesta.length : 0;
    });
    this.productoService.getProductos().subscribe(data => {
      this.totalProductos = data.respuesta ? data.respuesta.length : 0;
    });
    this.facturaService.getFacturas().subscribe(data => {
      this.totalFacturas = data.respuesta ? data.respuesta.length : 0;
    });
    this.pedidoService.getPedidos().subscribe(data => {
      this.totalPedidos = data.respuesta ? data.respuesta.length : 0;
    });
  }
}
