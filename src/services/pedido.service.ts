import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PedidoAPI } from 'src/models/pedido.model';

@Injectable({ providedIn: 'root' })
export class PedidoService {

  private API_BASE_URL = 'https://api-postresnancy.onrender.com/';
  private INSERTAR_ENDPOINT = 'detalles/compra/';
  private OBTENER_ENDPOINT = 'estados/listar';

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
    };

    console.log("📤 ENVIANDO AL BACKEND", body);

    return this.http.post<any>(
      `${this.API_BASE_URL}${this.INSERTAR_ENDPOINT}${id_cliente}`,
      body
    );
}

obtenerPedidos(id_cliente: number){
  return this.http.get<PedidoAPI[]>(`${this.API_BASE_URL}${this.OBTENER_ENDPOINT+id_cliente}`);
}


}
