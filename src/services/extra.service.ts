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

  constructor(private http: HttpClient) {}
  
  obtenerExtras(): Observable<ExtraAPI[]> {
    return this.http.get<ExtraAPI[]>(`${this.API_BASE_URL}${this.EXTRAS_ENDPOINT}`);
  }
}