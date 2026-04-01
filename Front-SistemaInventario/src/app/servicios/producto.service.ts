import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { Observable } from 'rxjs';
import { CrearProducto } from '../modelo/crearObjetos';
import { EditarProducto } from '../modelo/editarObjeto';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://localhost:8080/productos/';

  constructor(private http: HttpClient) {}
  
       private getAuthHeaders(): HttpHeaders {
      const token = sessionStorage.getItem('AuthToken');
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    }
  // Obtener lista de productos
  getProductos(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(this.apiUrl + 'obtenerListaProductos', { headers: this.getAuthHeaders() });
  }

  // Obtener producto por ID
  getProducto(id: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}obtenerProducto/${id}`, { headers: this.getAuthHeaders() });
  }

  // Crear producto
  crearProducto(dto: CrearProducto): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + 'crearProducto', dto, { headers: this.getAuthHeaders() });
  }

  // Eliminar producto
  eliminarProducto(id: number): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`${this.apiUrl}eliminarProducto/${id}`, { headers: this.getAuthHeaders() });
  }

  // Editar producto
  editarProducto(dto: EditarProducto): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl + 'editarProducto', dto, { headers: this.getAuthHeaders() });
  }
}
