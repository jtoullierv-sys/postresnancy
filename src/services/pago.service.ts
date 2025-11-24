import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PagoService {

  private API_BASE_URL = 'https://api-postresnancy.onrender.com/';
  private INSERTAR_ENDPOINT = 'pagos/registrar';

  constructor(private http: HttpClient) {}

  registrarPagoConImagen(formData: FormData): Observable<any> {
    return this.http.post<any>(
      `${this.API_BASE_URL}${this.INSERTAR_ENDPOINT}`,
      formData
    );
  }
}
