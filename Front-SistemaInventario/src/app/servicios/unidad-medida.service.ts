import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {
  private apiUrl = `${environment.apiUrl}/api/unidades-medida`;

  constructor(private http: HttpClient) {}

  setUnidadMedida(dto: any): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl, dto);
  }

  getAll(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(this.apiUrl);
  }

  getByProduct(productId: number): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}/producto/${productId}`);
  }
}
