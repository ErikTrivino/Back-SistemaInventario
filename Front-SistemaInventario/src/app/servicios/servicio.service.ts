import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
import { CrearServicio } from '../modelo/crearObjetos';
import { EditarServicio } from '../modelo/editarObjeto';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private apiUrl = 'http://localhost:8080/servicios/';

  constructor(private http: HttpClient) {}

       private getAuthHeaders(): HttpHeaders {
      const token = sessionStorage.getItem('AuthToken');
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
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
    return this.http.post<MensajeDTO>(this.apiUrl + 'editarServicio', dto, { headers: this.getAuthHeaders() });
  }
}
