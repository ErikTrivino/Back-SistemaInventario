
import { DetallePedido } from "../pedido/detallePedido";
import { Proveedor } from "../proveedor/proveedor";
import { DetalleServicioProducto } from "../servicio/detalleServicioProducto";

export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  available: number;
  singlePrice: number;
  id_proveedor:number;



  proveedor?: Proveedor;
  detallesServicio?: DetalleServicioProducto[];
  detallesPedido?: DetallePedido[];
}