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

  constructor(private http: HttpClient) {}

  obtenerPostres(): Observable<PostreAPI[]> {
    return this.http.get<PostreAPI[]>(`${this.API_BASE_URL}${this.POSTRES_ENDPOINT}`);
  }
}