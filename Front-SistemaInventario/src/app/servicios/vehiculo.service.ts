import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
import { CrearVehiculo } from '../modelo/crearObjetos';
import { EditarVehiculo } from '../modelo/editarObjeto';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

 private apiUrl = 'http://localhost:8080/vehiculos/';

  constructor(private http: HttpClient) {}
       private getAuthHeaders(): HttpHeaders {
      const token = sessionStorage.getItem('AuthToken');
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
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
    return this.http.post<MensajeDTO>(this.apiUrl + 'editarVehiculo', dto, { headers: this.getAuthHeaders() });
  }
}
