import { Cliente } from "../cliente/cliente";
import { Usuario } from "../usuario/usuario";
import { DetalleFactura } from "./detalleFactura";

export interface Factura {
  idFactura: number;
  fechaFactura: Date;
  total: number;
  metodoPago: string;
  id_cliente:number;
  id_empleado:number;


  cliente?: Cliente;
  empleado?: Usuario;
  detalles?: DetalleFactura[];
}