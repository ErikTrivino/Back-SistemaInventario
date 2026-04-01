import { Cliente } from "../cliente/cliente";
import { DetalleServicioVehiculo } from "../servicio/detalleServicioVehiculo";


export interface Vehiculo {
  idVehiculo: number;
  matricula: string;
  modelo: string;
  description: string;
  id_cliente:number;




  cliente?: Cliente;
  detalles?: DetalleServicioVehiculo[];
}