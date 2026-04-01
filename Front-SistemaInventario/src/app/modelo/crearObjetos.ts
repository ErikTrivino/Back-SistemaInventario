export interface CrearCliente {
  nombre: string;
  apellido: string;
  identificacion: number;


}

export interface CrearVehiculo {
  
  matricula: string;
  modelo: string;
  description: string;
  idCliente: number;

}

export interface CrearServicio {
  
  fecha: Date;
  descripcion: string;
  idCliente: number;
  id_empleado:number;
  
}

export interface CrearUsuario {

  nombre: string;
  apellido: string;
  identificacion: number;
  numerophone: number;
  edad: number;
  correo: string;
  password:string;
  estado:string;
  rol:string;

}

export interface CrearFactura {

  fechaFactura: Date;
  total: number;
  metodoPago: string;
  idCliente: number;
  idEmpleado:number;


}

export interface CrearProducto {

  nombre: string;
  descripcion: string;
  available: number;
  singlePrice: number;
  idProveedor: number;


}

export interface CrearProveedor {

  nombre: string;
  identificacion: number;
  telefono: number;
  correo: string;


}

export interface CrearPedido {
  nombrePedido: string;
  fechaPedido: Date;
  estado: string;
  idProveedor: number;
  idEmpleado:number;


  
}

export interface CrearDetalleFactura {
  costServicio: number;
  idServicio: number;
  idFactura:number;
}

export interface CrearDetalleServicioVehiculo {
  descripcion: string;
  idVehiculo: number;
  idServicio: number;


}

export interface CrearDetalleServicioProducto {

  cantidadUsada: number;
  idServicio: number;
  idProducto: number;


}

export interface CrearDetallePedido {

  cantidad: number;
  precioUnitario: number;
  idPedido: number;
  idProducto: number;

}
