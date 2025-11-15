import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PagoService {

  private API_BASE_URL = 'https://api-postresnancy.onrender.com/';
  private INSERTAR_ENDPOINT = 'pagos/insertar';

  constructor(private http: HttpClient) {}

  insertarPago(body: {
    id_pedido: number;
    medio_pago: string;
    imagen_pago: string; 
    fecha_pago: string;
  }): Observable<any> {
    return this.http.post<any>(
      `${this.API_BASE_URL}${this.INSERTAR_ENDPOINT}`,
      body
    );
  }
}
