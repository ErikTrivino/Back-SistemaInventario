import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { CrearCliente } from '../modelo/cliente/CrearCliente';
import { EditarCliente } from '../modelo/editarObjeto';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/clientes/'; 

  constructor(private http: HttpClient) {}

   private getAuthHeaders(): HttpHeaders {
  const token = sessionStorage.getItem('AuthToken');
  return new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
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
}
