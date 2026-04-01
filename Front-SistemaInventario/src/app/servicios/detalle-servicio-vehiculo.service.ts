import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrearDetalleServicioVehiculo } from '../modelo/crearObjetos';
import { EditarDetalleServicioVehiculo } from '../modelo/editarObjeto';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleServicioVehiculoService {

  private apiUrl = 'http://localhost:8080/detallesserviciovehiculo/';

  constructor(private http: HttpClient) {}
       private getAuthHeaders(): HttpHeaders {
      const token = sessionStorage.getItem('AuthToken');
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
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
    return this.http.post<MensajeDTO>(this.apiUrl + 'editarDetalleServicioVehiculo', dto, { headers: this.getAuthHeaders() });
  }
}
