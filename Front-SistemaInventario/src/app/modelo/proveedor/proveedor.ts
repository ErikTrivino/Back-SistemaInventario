import { Pedido } from "../pedido/pedido";
import { Producto } from "../producto/producto";

export interface Proveedor {
  idProveedor: number;
  nombre: string;
  identificacion: number;
  telefono: number;
  correo: string;

  productos?: Producto[];
  pedidos?: Pedido[];
}