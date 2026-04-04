import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MensajeDTO } from '../modelo/mensaje-dto';
import { InformacionTransportistaDTO } from '../modelo/informacionObjeto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransportistaService {

  private apiUrl = `${environment.apiUrl}/api/transportistas`;

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de todos los transportistas.
   * @returns Un Observable con la respuesta del servidor.
   */
  listarTransportistas(): Observable<MensajeDTO<InformacionTransportistaDTO[]>> {
    return this.http.get<MensajeDTO<InformacionTransportistaDTO[]>>(this.apiUrl);
  }
}
