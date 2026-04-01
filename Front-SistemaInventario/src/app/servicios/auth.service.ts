import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrearUsuario } from '../modelo/crearObjetos';
import { LoginDTO } from '../modelo/login-dto';
import { MensajeDTO } from '../modelo/mensaje-dto';



@Injectable({
 providedIn: 'root'
})
export class AuthService {
  


 private authURL = "http://localhost:8080/api/auth";
 


 constructor(private http: HttpClient) { }

public crearCuenta(cuentaDTO: CrearUsuario): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.authURL}/crear-cuenta`, cuentaDTO);
 }
 
 
 public iniciarSesion(loginDTO: LoginDTO): Observable<MensajeDTO> {
  return this.http.post<MensajeDTO>(`${this.authURL}/iniciar-sesion`, loginDTO);
 }

}