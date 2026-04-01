import { Proveedor } from "../proveedor/proveedor";
import { Usuario } from "../usuario/usuario";
import { DetallePedido } from "./detallePedido";


export interface Pedido {
  idPedido: number;
  nombrePedido: string;
  fechaPedido: Date;
  estado: string;
  idProveedor:number;
  idEmpleado:number;


  proveedor?: Proveedor;
  empleado?: Usuario;
  detalles?: DetallePedido[];
}