import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
import { CrearDetalleFactura } from '../modelo/crearObjetos';
import { EditarDetalleFactura } from '../modelo/editarObjeto';

@Injectable({
  providedIn: 'root'
})
export class DetalleFacturaService {
  private apiUrl = 'http://localhost:8080/detallesfactura/';

  constructor(private http: HttpClient) {}
     private getAuthHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('AuthToken');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
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
}