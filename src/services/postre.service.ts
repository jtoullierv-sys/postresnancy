import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostreAPI } from '../models/postre.model';

@Injectable({
  providedIn: 'root'
})
export class PostreService {
  private API_BASE_URL = 'https://api-postresnancy.onrender.com/';
  private POSTRES_ENDPOINT = 'postres/listar';
  private POSTREST_ENDPOINT = 'postres/listar?estado=1';
  private CAMBIARESTADO_ENDPOINT = 'postres/cambiar-estado/';
  private AGREGAR_POSTRE = 'postres/insertar';
  private ACTUALIZAR_POSTRE_ENDPOINT = 'postres/actualizar/';

  constructor(private http: HttpClient) {}

  obtenerPostres(): Observable<PostreAPI[]> {
    return this.http.get<PostreAPI[]>(`${this.API_BASE_URL}${this.POSTRES_ENDPOINT}`);
  }

  obtenerTodoslosPostres(): Observable<PostreAPI[]> {
    return this.http.get<PostreAPI[]>(`${this.API_BASE_URL}${this.POSTREST_ENDPOINT}`);
  }

  cambiarEstadoPostre(id_postre: number, nuevoEstado: number): Observable<any> {
  return this.http.put(
    `${this.API_BASE_URL}${this.CAMBIARESTADO_ENDPOINT}${id_postre}`,
    { estado_postre: nuevoEstado }
  );
 }
 
  agregarPostre(body: any): Observable<any> {
    return this.http.post(
      `${this.API_BASE_URL}${this.AGREGAR_POSTRE}`,
      body
    );
  }

  actualizarPostre(id: number, body: any) {
    return this.http.put(`${this.API_BASE_URL}${this.ACTUALIZAR_POSTRE_ENDPOINT+id}`, body);
  }

}