import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authURL = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  public iniciarSesion(loginDTO: any): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/iniciar-sesion`, loginDTO);
  }

  public registrarUsuario(dto: any): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/registrar`, dto);
  }
}