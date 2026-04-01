import { Factura } from "../factura/factura";
import { Pedido } from "../pedido/pedido";
import { Servicio } from "../servicio/servicio";


export interface Usuario {
  idUsuario: number;
  nombre: string;
  apellido: string;
  identificacion: number;
  numerophone: number;
  edad: number;
  correo: string;
    password:string;
  estado:string;
  rol:string;

  servicios?: Servicio[];
  facturas?: Factura[];
  pedidos?: Pedido[];
}