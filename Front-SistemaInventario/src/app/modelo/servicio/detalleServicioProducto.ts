import { Producto } from "../producto/producto";
import { Servicio } from "./servicio";



export interface DetalleServicioProducto {
  idDetalleServicioProducto: number;
  cantidadUsada: number;
  idServicio:number;
  idProducto:number;



  servicio?: Servicio;
  producto?: Producto;
}