import { Producto } from "../producto/producto";
import { Pedido } from "./pedido";


export interface DetallePedido {
  idDetallePedido: number;
  cantidad: number;
  precioUnitario: number;
  idPedido:number;
  idProducto:number;


  pedido?: Pedido;
  producto?: Producto;
}