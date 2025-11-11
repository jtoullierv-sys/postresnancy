import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteAPI } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private API_BASE_URL = 'https://api-postresnancy.onrender.com/';
  private CLIENTE_ENDPOINT = 'clientes/insertar-cliente';

  constructor(private http: HttpClient) {}

  insertarCliente(data: any): Observable<any> {
    return this.http.post(`${this.API_BASE_URL}${this.CLIENTE_ENDPOINT}`, data);
  }
}