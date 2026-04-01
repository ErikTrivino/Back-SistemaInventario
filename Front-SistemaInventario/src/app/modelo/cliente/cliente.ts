import { Factura } from "../factura/factura";
import { Servicio } from "../servicio/servicio";
import { Vehiculo } from "../vehiculo/vehiculo";


export interface Cliente {
  idCliente: number;
  nombre: string;
  apellido: string;
  identificacion: number;
  vehiculos?: Vehiculo[];
  servicios?: Servicio[];
  facturas?: Factura[];
}