export interface CrearFactura {
  fechaFactura: Date;
  total: number;
  metodoPago: string;
  idCliente: number;
  idEmpleado: number;
}
