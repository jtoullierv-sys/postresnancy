import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarritoAPI } from '../models/carrito.model';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private API_BASE_URL = 'https://api-postresnancy.onrender.com/detalles/carrito/';
  private INSERTAR_ENDPOINT = 'agregar';
  private OBTENER_ENDPOINT = 'cliente/';
  private ELIMINARITEM_ENDOPOINT = 'eliminar/'

  constructor(private http: HttpClient) {}
  
  insertarCarrito(
    cantidad_postre: number,
    subtotal_carrito: number,
    id_cliente: number,
    id_postre: number,
    id_extra: number
  ): Observable<any> {
    const body = {
      id_cliente: id_cliente,
      id_postre: id_postre,
      id_extra: id_extra,
      cantidad: cantidad_postre,
      subtotal: parseFloat(subtotal_carrito.toString())
    };

    console.log('Body enviado:', body);

    return this.http.post<any>(
      `${this.API_BASE_URL}${this.INSERTAR_ENDPOINT}`,
      body,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  obtenerCarrito($id_cliente : number): Observable<CarritoAPI[]> {
    return this.http.get<CarritoAPI[]>(`${this.API_BASE_URL}${this.OBTENER_ENDPOINT+$id_cliente}`);
  }
  
  eliminarCarrito(id_carrito: number): Observable<any> {
  return this.http.delete<any>(
    `${this.API_BASE_URL}${this.ELIMINARITEM_ENDOPOINT}${id_carrito}`
  );

} 
}