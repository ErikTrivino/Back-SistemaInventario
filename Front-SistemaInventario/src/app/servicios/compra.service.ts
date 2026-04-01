import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private apiUrl = `${environment.apiUrl}/api/compras`;

  constructor(private http: HttpClient) {}

  createPurchase(dto: any): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(this.apiUrl, dto);
  }

  receivePurchase(dto: any): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.apiUrl}/recepcion`, dto);
  }

  getPurchaseHistory(supplierId?: number, productId?: number, startDate?: string, endDate?: string, pagina?: number, porPagina: number = 10): Observable<MensajeDTO> {
    let params = new HttpParams().set('porPagina', porPagina.toString());
    if (supplierId) params = params.set('supplierId', supplierId.toString());
    if (productId) params = params.set('productId', productId.toString());
    if (startDate) params = params.set('startDate', startDate);
    if (endDate) params = params.set('endDate', endDate);
    if (pagina !== undefined) params = params.set('pagina', pagina.toString());
    return this.http.get<MensajeDTO>(`${this.apiUrl}/historico`, { params });
  }
}
