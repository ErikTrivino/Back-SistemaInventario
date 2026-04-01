import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CrearPedido } from '../modelo/crearObjetos';
import { EditarPedido } from '../modelo/editarObjeto';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = 'http://localhost:8080/pedidos/';

  constructor(private http: HttpClient) {}

       private getAuthHeaders(): HttpHeaders {
      const token = sessionStorage.getItem('AuthToken');
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
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
    return this.http.post<MensajeDTO>(this.apiUrl + 'editarPedido', dto, { headers: this.getAuthHeaders() });
  }

  // Obtener pedidos de proveedor
  obtenerPedidosProveedor(idProveedor: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}pedidos/${idProveedor}`, { headers: this.getAuthHeaders() });
  }
}
