import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { environment } from '../../environments/environment';
import { InformacionMovimientoDTO, Page } from '../modelo/informacionObjeto';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  private apiUrl = `${environment.apiUrl}/api/movimientos`;

  constructor(private http: HttpClient) {}

  registrarRetiro(dto: any): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.apiUrl}/retiro`, dto);
  }

  buscarMovimientos(
    productoId?: number,
    sucursalId?: number,
    fechaInicio?: string,
    fechaFin?: string,
    page: number = 0,
    size: number = 10,
    sort: string = 'fechaMovimiento,desc'
  ): Observable<MensajeDTO<Page<InformacionMovimientoDTO>>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    if (productoId) {
      params = params.set('productoId', productoId.toString());
    }
    if (sucursalId) {
      params = params.set('sucursalId', sucursalId.toString());
    }
    if (fechaInicio) {
      params = params.set('fechaInicio', fechaInicio);
    }
    if (fechaFin) {
      params = params.set('fechaFin', fechaFin);
    }

    return this.http.get<MensajeDTO<Page<InformacionMovimientoDTO>>>(this.apiUrl, { params });
  }
}
