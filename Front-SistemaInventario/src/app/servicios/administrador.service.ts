import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { CrearCliente } from '../modelo/cliente/CrearCliente';
import { EditarCliente } from '../modelo/editarObjeto';
import { CrearDetalleFactura } from '../modelo/crearObjetos';
import { EditarDetalleFactura } from '../modelo/editarObjeto';
import { CrearDetallePedido } from '../modelo/crearObjetos';
import { EditarDetallePedido } from '../modelo/editarObjeto';
import { CrearDetalleServicioProducto } from '../modelo/crearObjetos';
import { EditarDetalleServicioProducto } from '../modelo/editarObjeto';
import { CrearDetalleServicioVehiculo } from '../modelo/crearObjetos';
import { EditarDetalleServicioVehiculo } from '../modelo/editarObjeto';
import { CrearFactura } from '../modelo/crearObjetos';
import { EditarFactura } from '../modelo/editarObjeto';
import { CrearPedido } from '../modelo/crearObjetos';
import { EditarPedido } from '../modelo/editarObjeto';
import { CrearProducto } from '../modelo/crearObjetos';
import { EditarProducto } from '../modelo/editarObjeto';
import { CrearProveedor } from '../modelo/crearObjetos';
import { EditarProveedor } from '../modelo/editarObjeto';
import { CrearServicio } from '../modelo/crearObjetos';
import { EditarServicio } from '../modelo/editarObjeto';
import { CrearVehiculo } from '../modelo/crearObjetos';
import { EditarVehiculo } from '../modelo/editarObjeto';

import { CrearUsuario } from '../modelo/crearObjetos';
import { EditarUsuario } from '../modelo/editarObjeto';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private apiUrl = 'http://localhost:8080/admin/'; 
  private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('AuthToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }


  constructor(private http: HttpClient) { }
    // Obtener lista de usuarios
    getUsuarios(): Observable<MensajeDTO> {
      return this.http.get<MensajeDTO>(this.apiUrl + 'obtenerListaUsuarios', { headers: this.getAuthHeaders() });
    }
  
    // Obtener un usuario por ID
    getUsuario(id: number): Observable<MensajeDTO> {
      return this.http.get<MensajeDTO>(`${this.apiUrl}obtenerUsuario/${id}`, { headers: this.getAuthHeaders() });
    }
  
    // Crear nuevo usuario
    crearUsuario(dto: CrearUsuario): Observable<MensajeDTO> {
      return this.http.post<MensajeDTO>(this.apiUrl + 'crearUsuario', dto, { headers: this.getAuthHeaders() });
    }
  
    // Eliminar usuario
    eliminarUsuario(id: number): Observable<MensajeDTO> {
      return this.http.delete<MensajeDTO>(`${this.apiUrl}eliminarUsuario/${id}`, { headers: this.getAuthHeaders() });
    }
  
    // Editar usuario
    editarUsuario(dto: EditarUsuario): Observable<MensajeDTO> {
      return this.http.post<MensajeDTO>(this.apiUrl + 'editar', dto, { headers: this.getAuthHeaders() });
    }
  // Obtener todos los vehículos
  getVehiculos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(this.apiUrl + 'obtenerListaVehiculo', { headers: this.getAuthHeaders() });
  }

  // Obtener vehículo por ID
  getVehiculo(id: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}obtenerVehiculo/${id}`, { headers: this.getAuthHeaders() });
  }

  // Crear vehículo
  crearVehiculo(dto: CrearVehiculo): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + 'crearVehiculo', dto, { headers: this.getAuthHeaders() });
  }

  // Eliminar vehículo
  eliminarVehiculo(id: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.apiUrl}eliminarVehiculo/${id}`, { headers: this.getAuthHeaders() });
  }

  // Obtener vehículos por cliente
  getVehiculosPorCliente(idCliente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}obtenerVehiculosCliente/${idCliente}`, { headers: this.getAuthHeaders() });
  }

  // Editar vehículo
  editarVehiculo(dto: EditarVehiculo): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + 'editar', dto, { headers: this.getAuthHeaders() });
  }
   // Obtener todos los servicios
  getServicios(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(this.apiUrl + 'obtenerListaServicios', { headers: this.getAuthHeaders() });
  }

  // Obtener servicio por ID
  getServicio(id: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}obtenerServicio/${id}`, { headers: this.getAuthHeaders() });
  }

  // Crear un nuevo servicio
  crearServicio(dto: CrearServicio): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + 'crearServicio', dto, { headers: this.getAuthHeaders() });
  }

  // Eliminar servicio por ID
  eliminarServicio(id: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.apiUrl}eliminarServicio/${id}`, { headers: this.getAuthHeaders() });
  }

  // Obtener servicios por cliente
  getServiciosPorCliente(idCliente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}obtenerServiciosCliente/${idCliente}`, { headers: this.getAuthHeaders() });
  }

  // Obtener servicios por vehículo
  getServiciosPorVehiculo(idVehiculo: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}obtenerServiciosVehiculo/${idVehiculo}`, { headers: this.getAuthHeaders() });
  }

  // Editar servicio
  editarServicio(dto: EditarServicio): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + 'editar', dto, { headers: this.getAuthHeaders() });
  }
  // Obtener lista de proveedores
  getProveedores(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(this.apiUrl + 'obtenerListaProveedores', { headers: this.getAuthHeaders() });
  }

  // Obtener proveedor por ID
  getProveedor(id: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}obtenerProveedor/${id}`, { headers: this.getAuthHeaders() });
  }

  // Crear proveedor
  crearProveedor(dto: CrearProveedor): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + 'crearProveedor', dto, { headers: this.getAuthHeaders() });
  }

  // Eliminar proveedor
  eliminarProveedor(id: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.apiUrl}eliminarProveedor/${id}`, { headers: this.getAuthHeaders() });
  }

  // Obtener productos de un proveedor
  getProductosDeProveedor(idProveedor: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}productos/${idProveedor}`, { headers: this.getAuthHeaders() });
  }

  // Editar proveedor
  editarProveedor(dto: EditarProveedor): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + 'editar', dto, { headers: this.getAuthHeaders() });
  }
   // Obtener lista de productos
  getProductos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(this.apiUrl + 'obtenerListaProductos', { headers: this.getAuthHeaders() });
  }

  // Obtener producto por ID
  getProducto(id: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}obtenerProducto/${id}`, { headers: this.getAuthHeaders() });
  }

  // Crear producto
  crearProducto(dto: CrearProducto): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + 'crearProducto', dto, { headers: this.getAuthHeaders() });
  }

  // Eliminar producto
  eliminarProducto(id: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.apiUrl}eliminarProducto/${id}`, { headers: this.getAuthHeaders() });
  }

  // Editar producto
  editarProducto(dto: EditarProducto): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + 'editar', dto, { headers: this.getAuthHeaders() });
  }
   // Obtener lista de pedidos
  getPedidos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(this.apiUrl + 'obtenerListaPedido', { headers: this.getAuthHeaders() });
  }

  // Obtener pedido por ID
  getPedido(id: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}obtenerPedido/${id}`, { headers: this.getAuthHeaders() });
  }

  // Crear pedido
  crearPedido(dto: CrearPedido): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + 'crearPedido', dto, { headers: this.getAuthHeaders() });
  }

  // Eliminar pedido
  eliminarPedido(id: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.apiUrl}eliminarPedido/${id}`, { headers: this.getAuthHeaders() });
  }

  // Editar pedido
  editarPedido(dto: EditarPedido): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + 'editar', dto, { headers: this.getAuthHeaders() });
  }

  // Obtener pedidos de proveedor
  obtenerPedidosProveedor(idProveedor: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}pedidos/${idProveedor}`, { headers: this.getAuthHeaders() });
  }
  // Obtener todas las facturas
  getFacturas(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(this.apiUrl + 'obtnerListaFactura', { headers: this.getAuthHeaders() });
  }

  // Obtener factura por ID
  getFactura(id: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}obtenerFactura/${id}`, { headers: this.getAuthHeaders() });
  }

  // Crear nueva factura
  crearFactura(dto: CrearFactura): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + 'crearFactura', dto, { headers: this.getAuthHeaders() });
  }

  // Eliminar factura
  eliminarFactura(id: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.apiUrl}eliminarFactura/${id}`, { headers: this.getAuthHeaders() });
  }

  // Editar factura
  editarFactura(dto: EditarFactura): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + 'editar', dto, { headers: this.getAuthHeaders() });
  }

  // Obtener facturas de un cliente
  obtenerFacturasCliente(idCliente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}obtenerfacturasCliente/${idCliente}`, { headers: this.getAuthHeaders() });
  }

  // Obtener todos los detalles
  getDetallesServicioVehiculo(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(this.apiUrl + 'obtenerListaDetalleServicioVehiculo', { headers: this.getAuthHeaders() });
  }

  // Obtener un detalle por ID
  getDetalleServicioVehiculo(id: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}obtenerDetalleServicioVehiculo/${id}`, { headers: this.getAuthHeaders() });
  }


    // Obtener un detalle por ID
  getDetalleServicioVehiculoByIdServicio(id: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}obtenerDetalleServicioVehiculoByIdServicio/${id}`, { headers: this.getAuthHeaders() });
  }


  // Crear un nuevo detalle
  crearDetalleServicioVehiculo(dto: CrearDetalleServicioVehiculo): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + 'crearDetalleServicioVehiculo', dto, { headers: this.getAuthHeaders() });
  }

  // Eliminar un detalle
  eliminarDetalleServicioVehiculo(id: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.apiUrl}eliminarDetalleServicioVehiculo/${id}`, { headers: this.getAuthHeaders() });
  }

  // Editar un detalle
  editarDetalleServicioVehiculo(dto: EditarDetalleServicioVehiculo): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + 'editar', dto, { headers: this.getAuthHeaders() });
  }
    // Obtener todos los clientes
    getClientes(): Observable<MensajeDTO> {
      return this.http.get<MensajeDTO>(this.apiUrl + 'obtenerListaClientes', { headers: this.getAuthHeaders() });
    }
  
    // Obtener un cliente específico
    getCliente(id: number): Observable<MensajeDTO> {
      return this.http.get<MensajeDTO>(`${this.apiUrl}obtenerCliente/${id}`, { headers: this.getAuthHeaders() });
    }
  
    // Crear un nuevo cliente
    crearCliente(cliente: CrearCliente): Observable<MensajeDTO> {
      return this.http.post<MensajeDTO>(this.apiUrl + 'crearCliente', cliente, { headers: this.getAuthHeaders() });
    }
  
    // Editar un cliente existente
    editarCliente(cliente: EditarCliente): Observable<MensajeDTO> {
      return this.http.post<MensajeDTO>(this.apiUrl + 'editarCliente', cliente, { headers: this.getAuthHeaders() });
    }
  
    // Eliminar un cliente por ID
    eliminarCliente(id: number): Observable<MensajeDTO> {
      return this.http.delete<MensajeDTO>(this.apiUrl + `eliminarCliente/${id}`, { headers: this.getAuthHeaders() });
    }
    // Obtener todos los detalles de factura
  getDetallesFactura(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(this.apiUrl + 'obtenerListaDetallesFactura', { headers: this.getAuthHeaders() });
  }

  // Obtener todos los detalles de factura  obtenerListaDetallesFacturaByidFactura
  getDetallesFacturaByIdFactura(id:number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>((`${this.apiUrl}obtenerListaDetallesFacturaByidFactura/${id}`), { headers: this.getAuthHeaders() });
  }

  // Obtener un detalle específico
  getDetalleFactura(id: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}obtenerDetalleFactura/${id}`, { headers: this.getAuthHeaders() });
  }

  // Crear un nuevo detalle de factura
  crearDetalleFactura(dto: CrearDetalleFactura): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + 'crearDetalleFactura', dto, { headers: this.getAuthHeaders() });
  }

  // Eliminar un detalle de factura
  eliminarDetalleFactura(id: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.apiUrl}eliminar/${id}`, { headers: this.getAuthHeaders() });
  }

  // Editar un detalle de factura
  editarDetalleFactura(dto: EditarDetalleFactura): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + 'editar', dto, { headers: this.getAuthHeaders() });
  }

  // Obtener todos los detalles de pedido
  getDetallesPedido(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(this.apiUrl + 'obtenerListaDetallePedido', { headers: this.getAuthHeaders() });
  }

  // Obtener un detalle de pedido por ID
  getDetallePedido(id: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}obtenerDetallePedido/${id}`, { headers: this.getAuthHeaders() });
  }

    // Obtener un detalle de pedido por ID
  getDetallesPedidoByIdPedido(id: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}obtenerDetallePedidoByIdPedido/${id}`, { headers: this.getAuthHeaders() });
  }

  // Crear un nuevo detalle de pedido
  crearDetallePedido(dto: CrearDetallePedido): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + 'crearDetallePedido', dto, { headers: this.getAuthHeaders() });
  }

  // Eliminar un detalle de pedido
  eliminarDetallePedido(id: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.apiUrl}eliminarDetallePedido/${id}`, { headers: this.getAuthHeaders() });
  }

  // Editar un detalle de pedido
  editarDetallePedido(dto: EditarDetallePedido): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + 'editar', dto, { headers: this.getAuthHeaders() });
  }
  // Obtener todos los detalles
  getDetallesServicioProducto(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(this.apiUrl + 'obtenerListaDetalleServicioProducto', { headers: this.getAuthHeaders() });
  }

  // Obtener un detalle por ID
  getDetalleServicioProductoById(id: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}obtenerDetalleServicioProducto/${id}`, { headers: this.getAuthHeaders() });
  }

  // Obtener un detalle por ID serivcio
  getDetalleServicioProductoByIdServicio(id: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}obtenerDetallesByServicioProducto/${id}`, { headers: this.getAuthHeaders() });
  }

  // Crear un nuevo detalle
  crearDetalleServicioProducto(dto: CrearDetalleServicioProducto): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + 'crearDetalleServicioProducto', dto, { headers: this.getAuthHeaders() });
  }

  // Eliminar un detalle
  eliminarDetalleServicioProducto(id: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.apiUrl}eliminarDetalleServicioProducto/${id}`, { headers: this.getAuthHeaders() });
  }

  // Editar un detalle
  editarDetalleServicioProducto(dto: EditarDetalleServicioProducto): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + 'editar', dto, { headers: this.getAuthHeaders() });
  }

}
