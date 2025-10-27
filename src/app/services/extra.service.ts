// src/app/services/postre.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExtraAPI } from '../models/extra.model';

@Injectable({
  providedIn: 'root'
})
export class ExtraService {
  private url = 'assets/data/extras.json'; // 📁 JSON temporal local

  constructor(private http: HttpClient) {}

  obtenerExtras(): Observable<ExtraAPI[]> {
    return this.http.get<ExtraAPI[]>(this.url);
  }
}