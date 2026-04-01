import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { CrearDetallePedido } from '../modelo/crearObjetos';
import { EditarDetallePedido } from '../modelo/editarObjeto';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {
  private apiUrl = 'http://localhost:8080/detallespedido/';

  constructor(private http: HttpClient) {}
       private getAuthHeaders(): HttpHeaders {
      const token = sessionStorage.getItem('AuthToken');
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
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
}
