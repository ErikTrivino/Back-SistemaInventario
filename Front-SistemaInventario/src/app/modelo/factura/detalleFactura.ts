import { Servicio } from "../servicio/servicio";
import { Factura } from "./factura";


export interface DetalleFactura {
  idDetalleFactura: number;
  costServicio: number;
  idFactura:number;
  idServicio:number;


  factura?: Factura;
  servicio?: Servicio;
}