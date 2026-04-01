import { Vehiculo } from "../vehiculo/vehiculo";
import { Servicio } from "./servicio";


export interface DetalleServicioVehiculo {
  idDetalleServicioVehiculo: number;
  descripcion: string;
  idServicio:number;
  idVehiculo:number;

  servicio?: Servicio;
  vehiculo?: Vehiculo;
}