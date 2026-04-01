import { Cliente } from "../cliente/cliente";
import { DetalleFactura } from "../factura/detalleFactura";
import { Usuario } from "../usuario/usuario";
import { DetalleServicioProducto } from "./detalleServicioProducto";
import { DetalleServicioVehiculo } from "./detalleServicioVehiculo";


export interface Servicio {
  idServicio: number;
  fecha: Date;
  descripcion: string;
  id_cliente:number;
  id_empleado:number;



  cliente?: Cliente;
  empleado?: Usuario;
  detallesFactura?: DetalleFactura[];
  detallesVehiculo?: DetalleServicioVehiculo[];
  detallesProducto?: DetalleServicioProducto[];
}