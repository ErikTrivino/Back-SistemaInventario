import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
import { CrearFactura } from '../modelo/crearObjetos';
import { EditarFactura } from '../modelo/editarObjeto';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private apiUrl = 'http://localhost:8080/facturas/';

  constructor(private http: HttpClient) {}
       private getAuthHeaders(): HttpHeaders {
      const token = sessionStorage.getItem('AuthToken');
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
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
    return this.http.post<MensajeDTO>(this.apiUrl + 'editarFactura', dto, { headers: this.getAuthHeaders() });
  }

  // Obtener facturas de un cliente
  obtenerFacturasCliente(idCliente: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}obtenerfacturasCliente/${idCliente}`, { headers: this.getAuthHeaders() });
  }
}
