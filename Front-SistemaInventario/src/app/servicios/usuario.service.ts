import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/api/admin/usuarios`;

  constructor(private http: HttpClient) {}

  crearUsuario(dto: any): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl, dto);
  }

  consultarPorId(id: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}/${id}`);
  }

  consultarPorEmail(email: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}/email/${email}`);
  }

  actualizarUsuario(id: number, dto: any): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.apiUrl}/${id}`, dto);
  }

  inactivarUsuario(id: number, motivo: string): Observable<MensajeDTO> {
    const params = new HttpParams().set('motivo', motivo);
    return this.http.patch<MensajeDTO>(`${this.apiUrl}/${id}/inactivar`, null, { params });
  }

  filtrarPorSucursal(sucursalId: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}/sucursal/${sucursalId}`);
  }

  filtrarPorRol(rol: string): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}/rol/${rol}`);
  }

  buscarPorNombre(query?: string, activo?: boolean): Observable<MensajeDTO> {
    let params = new HttpParams();
    if (query) params = params.set('query', query);
    if (activo !== undefined) params = params.set('activo', activo.toString());
    return this.http.get<MensajeDTO>(`${this.apiUrl}/busqueda`, { params });
  }

  cambiarRol(id: number, nuevoRol: string): Observable<MensajeDTO> {
    return this.http.patch<MensajeDTO>(`${this.apiUrl}/${id}/rol`, { nuevoRol });
  }

  getUsuarios(pagina?: number, porPagina: number = 10): Observable<MensajeDTO> {
    let params = new HttpParams().set('porPagina', porPagina.toString());
    if (pagina !== undefined) params = params.set('pagina', pagina.toString());
    return this.http.get<MensajeDTO>(this.apiUrl, { params });
  }
}
