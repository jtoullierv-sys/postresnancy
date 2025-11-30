import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagoAPI } from 'src/models/pago.model';

@Injectable({ providedIn: 'root' })
export class PagoService {

  private API_BASE_URL = 'https://api-postresnancy.onrender.com/';
  private INSERTAR_ENDPOINT = 'pagos/registrar';
  private OBTENER_ENDPOINT = 'pagos/pedido/';

  constructor(private http: HttpClient) {}

  registrarPagoConImagen(formData: FormData): Observable<any> {
    return this.http.post<any>(
      `${this.API_BASE_URL}${this.INSERTAR_ENDPOINT}`,
      formData
    );
  }

  obtenerPagoPorPedido(id_pedido: number) {
    return this.http.get<PagoAPI>(`${this.API_BASE_URL}${this.OBTENER_ENDPOINT+id_pedido}`);
  }
}
