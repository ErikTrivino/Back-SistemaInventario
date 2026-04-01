import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
import { CrearProveedor } from '../modelo/crearObjetos';
import { EditarProveedor } from '../modelo/editarObjeto';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

    private apiUrl = 'http://localhost:8080/proveedores/';

  constructor(private http: HttpClient) {}
       private getAuthHeaders(): HttpHeaders {
      const token = sessionStorage.getItem('AuthToken');
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
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
    return this.http.post<MensajeDTO>(this.apiUrl + 'editarProvedor', dto, { headers: this.getAuthHeaders() });
  }
}
