import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioAPI } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private API_BASE_URL = 'https://api-postresnancy.onrender.com/';
  private REGISTRO_ENDPOINT = 'usuarios/insertar-usuario';
  private LOGIN_ENDPOINT = 'usuarios/login';

  constructor(private http: HttpClient) {}
  
  registrarUsuario(usuario: string, contrasena:string): Observable<any> {
    const body = { usuario, contrasena };
    return this.http.post<any>(
      `${this.API_BASE_URL}${this.REGISTRO_ENDPOINT}`,
      body,
      { headers: { 'Content-Type': 'application/json' } }
    )
  }

  loginUsuario(usuario: string, contrasena: string): Observable<any> {
  const body = { usuario, contrasena }; // formato correcto
    return this.http.post<any>(
      `${this.API_BASE_URL}${this.LOGIN_ENDPOINT}`,
      body,
      { headers: { 'Content-Type': 'application/json' } }
  );
  }
}