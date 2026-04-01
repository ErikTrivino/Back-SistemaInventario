import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {
  private apiUrl = `${environment.apiUrl}/api/transferencias`;

  constructor(private http: HttpClient) {}

  solicitar(dto: any): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.apiUrl}/solicitar`, dto);
  }

  preparar(dto: any): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.apiUrl}/preparar`, dto);
  }

  enviar(dto: any): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.apiUrl}/enviar`, dto);
  }

  recibir(dto: any): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.apiUrl}/recibir`, dto);
  }

  getHistorico(branchId: number, estado?: string, desde?: string, hasta?: string, pagina?: number, porPagina: number = 10): Observable<MensajeDTO> {
    let params = new HttpParams().set('branchId', branchId.toString()).set('porPagina', porPagina.toString());
    if (estado) params = params.set('estado', estado);
    if (desde) params = params.set('desde', desde);
    if (hasta) params = params.set('hasta', hasta);
    if (pagina !== undefined) params = params.set('pagina', pagina.toString());
    return this.http.get<MensajeDTO>(`${this.apiUrl}/historico`, { params });
  }
}
