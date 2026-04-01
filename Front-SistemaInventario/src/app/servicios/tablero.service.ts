import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TableroService {
  private apiUrl = `${environment.apiUrl}/api/tablero`;

  constructor(private http: HttpClient) {}

  getResumenDiario(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}/resumen`);
  }

  getAlertasStock(pagina?: number, porPagina: number = 10): Observable<MensajeDTO> {
    let params = new HttpParams().set('porPagina', porPagina.toString());
    if (pagina !== undefined) params = params.set('pagina', pagina.toString());
    return this.http.get<MensajeDTO>(`${this.apiUrl}/alertas-stock`, { params });
  }

  getMetricasTransferencias(): Observable<MensajeDTO> {
    return this.http.get<MensajeDTO>(`${this.apiUrl}/transferencias`);
  }
}
