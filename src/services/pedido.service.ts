import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PedidoService {

  private API_BASE_URL = 'https://api-postresnancy.onrender.com/';
  private INSERTAR_ENDPOINT = 'detalles/compra/';

  constructor(private http: HttpClient) {}

  insertarPedido(
  id_cliente: number,
  id_estadopedido: number,
  total_pagado: number,
  contacto_pedido: string,
  fecha_entrega: string,
  hora_entrega: string
): Observable<any> {

  const body = {
    id_estadopedido,
    total_pagado,
    contacto_pedido,
    fecha_entrega,
    hora_entrega,
    fecha_pedido: new Date().toISOString().split('T')[0], // YYYY-MM-DD
    monto_devuelto: 0
  };

  console.log("📤 ENVIANDO AL BACKEND", body);

  return this.http.post<any>(
    `${this.API_BASE_URL}${this.INSERTAR_ENDPOINT}${id_cliente}`,
    body
  );
}


}
