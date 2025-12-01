// src/app/services/postre.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExtraAPI } from '../models/extra.model';

@Injectable({
  providedIn: 'root'
})
export class ExtraService {
  private API_BASE_URL = 'https://api-postresnancy.onrender.com/';
  private EXTRAS_ENDPOINT = 'extras/listar';
  private EXTRAST_ENDPOINT = 'extras/listar?estado=1';

  constructor(private http: HttpClient) {}
  
  obtenerExtras(): Observable<ExtraAPI[]> {
    return this.http.get<ExtraAPI[]>(`${this.API_BASE_URL}${this.EXTRAS_ENDPOINT}`);
  }

  obtenerTodoslosExtras(): Observable<ExtraAPI[]> {
    return this.http.get<ExtraAPI[]>(`${this.API_BASE_URL}${this.EXTRAST_ENDPOINT}`);
  }

  cambiarEstadoExtra(id_extra: number, nuevoEstado: number): Observable<any> {
  return this.http.put(
    `${this.API_BASE_URL}extras/cambiar-estado/${id_extra}`,
    { estado_extra: nuevoEstado }
  );
}

}