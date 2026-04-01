import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrearDetalleServicioProducto } from '../modelo/crearObjetos';
import { EditarDetalleServicioProducto } from '../modelo/editarObjeto';
import { MensajeDTO } from '../modelo/mensaje-dto';

@Injectable({
  providedIn: 'root'
})
export class DetalleServicioProductoService {

  private apiUrl = 'http://localhost:8080/detallesservicioproducto/';

  constructor(private http: HttpClient) {}
       private getAuthHeaders(): HttpHeaders {
      const token = sessionStorage.getItem('AuthToken');
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
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
