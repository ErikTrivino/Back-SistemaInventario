import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  private apiUrl = `${environment.apiUrl}/api/movimientos`;

  constructor(private http: HttpClient) {}

  registrarRetiro(dto: any): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.apiUrl}/retiro`, dto);
  }
}
