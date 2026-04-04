
export interface DetalleProductoCrearDTO {
  precioCostoPromedio: number;
  cantidadInicial: number;
  cantidadMinima: number;
  idSucursal: number;
}

export interface ProductoCrearDTO {
  nombre: string;
  descripcion?: string;
  sku?: string;
  unidadMedidaBase: string;
  activo: boolean;
  idProveedor?: number;
  detalleProdcutoCrearDTO: DetalleProductoCrearDTO[];
}



export interface CrearUsuario {

  nombre: string;
  apellido: string;
  email: string;
  password?: string;
  rol: string;
  sucursalAsignadaId?: number;
  activo?: boolean;
  motivoInactivacion?: string;

}





export interface CrearProveedor {

  nitRut: string;
  razonSocial: string;
  contacto: string;
  email: string;

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

export interface ItemTransferenciaDTO {
  idProducto: number;
  cantidad: number;
}

export interface TransferenciaCrearDTO {
  idSucursalOrigen: number;
  idSucursalDestino: number;
  items: ItemTransferenciaDTO[];
}

export enum ClasificacionRuta {
  /** Prioridad alta de despacho y entrega. */
  PRIORIDAD = 'PRIORIDAD',

  /** Optimización de costos de transporte. */
  COSTO = 'COSTO',

  /** Optimización de tiempos de entrega. */
  TIEMPO = 'TIEMPO'
}

export interface TransferenciaPrepararDTO {
  idTransferencia: number;
  cantidadConfirmada: number;
  tipoClasificacion?: ClasificacionRuta;
  leadTimeEstandar?: number;
}

export interface TransferenciaConfirmarEnvioDTO {
  idTransferencia: number;
  tiempoEstimadoEntrega: number;
  idTransportista: number;
}

export interface TransferenciaConfirmarEnvioConCambiosDTO {
  idTransferencia: number;
  StockAceptadoEnvio: number;
  tiempoEstimadoEntrega: number;
  idTransportista: number;
}

export interface TransferenciaRecepcionDTO {
  idTransferencia: number;
  cantidadRecibida: number;
}

export interface DetalleCompraCrearDTO {
  idProducto: number;
  cantidad: number;
  precioUnitario: number;
  descuentoPorcentaje?: number;
}

export interface OrdenCompraCrearDTO {
  idSucursalDestino: number;
  idProveedor: number;
  plazoPagoDias?: number;
  detalles: DetalleCompraCrearDTO[];
}

export interface DetalleRecepcionDTO {
  idDetalle: number;
  cantidadRecibida: number;
}

export interface OrdenCompraRecepcionDTO {
  idOrdenCompra: number;
  idSucursalDestino: number;
  detallesRecibidos: DetalleRecepcionDTO[];
}

export interface DetalleVentaCrearDTO {
  idProducto: number;
  cantidad: number;
  precioUnitario: number;
  descuentoPorcentaje?: number; // opcional
  listaPrecioUsada?: string;    // opcional
}

export interface VentaCrearDTO {
  idSucursal: number;
  idResponsable: number;
  detalles: DetalleVentaCrearDTO[];
}