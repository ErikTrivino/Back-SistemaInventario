export interface EditarCliente {
  idCliente: number;
  nombre: string;
  apellido: string;
  identificacion: number;
}

export interface EditarVehiculo {
  idVehiculo: number;
  matricula: string;
  modelo: string;
  description: string;
  idCliente: number;
}

export interface EditarServicio {
  idServicio: number;
  fecha: Date;
  descripcion: string;
  idCliente: number;
  idEmpleado: number;
}

export interface EditarUsuario {
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

export interface EditarFactura {
  idFactura: number;
  fechaFactura: Date;
  total: number;
  metodoPago: string;
  idCliente: number;
  idEmpleado: number;
}

export interface EditarProducto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  available: number;
  singlePrice: number;
  idProveedor: number;
}

export interface EditarProveedor {
  idProveedor: number;
  nombre: string;
  identificacion: number;
  telefono: number;
  correo: string;
}

export interface EditarPedido {
  idPedido: number;
  nombrePedido: string;
  fechaPedido: Date;
  estado: string;
  idProveedor: number;
  idEmpleado: number;
}

export interface EditarDetalleFactura {
  idDetalleFactura: number;
  costServicio: number;
  idServicio: number;
  idFactura: number;
}

export interface EditarDetalleServicioVehiculo {
  idDetalleServicioVehiculo: number;
  descripcion: string;
  idVehiculo: number;
  idServicio: number;
}

export interface EditarDetalleServicioProducto {
  idDetalleServicioProducto: number;
  cantidadUsada: number;
  idServicio: number;
  idProducto: number;
}

export interface EditarDetallePedido {
  idDetallePedido: number;
  cantidad: number;
  precioUnitario: number;
  idPedido: number;
  idProducto: number;
}
