export interface InformacionCliente {
  idCliente: number;
  nombre: string;
  apellido: string;
  identificacion: number;
}

export interface InformacionVehiculo {
  idVehiculo: number;
  matricula: string;
  modelo: string;
  description: string;
  idCliente: number;
}

export interface InformacionServicio {
  idServicio: number;
  fecha: Date;
  descripcion: string;
  idCliente: number;
  idEmpleado: number;
}

export interface InformacionUsuario {
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
}

export interface InformacionFactura {
  idFactura: number;
  fechaFactura: Date;
  total: number;
  metodoPago: string;
  idCliente: number;
  idEmpleado: number;
}

export interface InformacionProducto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  available: number;
  singlePrice: number;
  idProveedor: number;
  nombreProveedor?: string; // ← nuevo campo opcional

}

export interface InformacionProveedor {
  idProveedor: number;
  nombre: string;
  identificacion: number;
  telefono: number;
  correo: string;
}

export interface InformacionPedido {
  idPedido: number;
  nombrePedido: string;
  fechaPedido: Date;
  estado: string;
  idProveedor: number;
  idEmpleado: number;
}

export interface InformacionDetalleFactura {
  idDetalleFactura: number;
  costServicio: number;
  idServicio: number;
  idFactura: number;
}

export interface InformacionDetalleServicioVehiculo {
  idDetalleServicioVehiculo: number;
  descripcion: string;
  idVehiculo: number;
  idServicio: number;
}

export interface InformacionDetalleServicioProducto {
  idDetalleServicioProducto: number;
  cantidadUsada: number;
  idServicio: number;
  idProducto: number;
}

export interface InformacionDetallePedido {
  idDetallePedido: number;
  cantidad: number;
  precioUnitario: number;
  idPedido: number;
  idProducto: number;
}
