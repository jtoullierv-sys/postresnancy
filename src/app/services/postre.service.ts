
// src/app/services/postre.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PostreAPI } from '../models/postre.model';

@Injectable({
  providedIn: 'root'
})
export class PostreService {
  private url = 'assets/data/postres.json'; // 📁 JSON temporal local

  constructor(private http: HttpClient) {}

  obtenerPostres(): Observable<PostreAPI[]> {
    return this.http.get<PostreAPI[]>(this.url);
  }
}