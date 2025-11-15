import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
  IonImg, IonButton
} from '@ionic/angular/standalone';

import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

import { PedidoService } from 'src/services/pedido.service';
import { PagoService } from 'src/services/pago.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-registrarpago',
  standalone: true,
  templateUrl: './registrarpago.page.html',
  styleUrls: ['./registrarpago.page.scss'],
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonItem, IonLabel, IonInput, IonSelect, IonSelectOption,
    IonImg, IonButton, HeaderComponent, FooterComponent
  ]
})
export class RegistrarpagoPage {

  totalp: number = 120.50;
  fechaActual: string = new Date().toLocaleDateString('es-PE');

  fentrega: string = '';
  hentrega: string = '';
  numero: string = '';

  comprobanteBase64: string = '';

  mediosPago = [
    { nombre: 'Yape', img: 'assets/img/qryape.jpeg' },
    { nombre: 'Plin', img: 'assets/img/qrplin.jpeg' },
    { nombre: 'Tunki', img: 'assets/img/qrtunki.jpeg' },
  ];
  medioSeleccionado = this.mediosPago[0].img;

  idCliente: number = 0;

  constructor(
    private pedidoService: PedidoService,
    private pagoService: PagoService,
    private storage: Storage,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    await this.storage.create();

    const cliente = await this.storage.get('cliente');
    this.idCliente = cliente?.id_cliente;

    this.route.queryParams.subscribe(params => {
      if (params['total']) {
        this.totalp = Number(params['total']);
      }
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.comprobanteBase64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // MÉTODO PRINCIPAL
  confirmarPago() {

    // 🛑 VALIDACIONES OBLIGATORIAS
    if (!this.fentrega || !this.hentrega || !this.numero) {
      alert("Debe completar fecha, hora y número de contacto.");
      return;
    }

    if (!this.comprobanteBase64) {
      alert("Debe subir un comprobante de pago.");
      return;
    }

    // 🔍 DEBUG: Ver lo que se enviará
    console.log("📦 DATOS A ENVIAR AL BACKEND:");
    console.log({
      id_cliente: this.idCliente,
      total: this.totalp,
      contacto: this.numero,
      fecha_entrega: this.fentrega,
      hora_entrega: this.hentrega
    });

    // PRIMERO REGISTRAR PEDIDO
    this.pedidoService.insertarPedido(
      this.idCliente,
      1,
      this.totalp,
      this.numero,
      this.fentrega,
      this.hentrega
    )
    .subscribe({
      next: (respPedido) => {
        console.log("✔ Pedido registrado:", respPedido);

        const id_pedido = respPedido.id_pedido;

        // LUEGO REGISTRAR PAGO
        this.pagoService.insertarPago({
          id_pedido: id_pedido,
          medio_pago: this.medioSeleccionado,
          imagen_pago: this.comprobanteBase64,
          fecha_pago: new Date().toISOString()
        })
        .subscribe({
          next: () => {
            alert('Pago registrado correctamente');
            this.router.navigate(['/catalogo']);
          },
          error: (err) => {
            console.error("❌ ERROR DETALLADO EN REGISTRO DE PAGO:", err);

            if (err.error && err.error.error) {
              console.error("📌 MENSAJE REAL DEL SERVIDOR:", err.error.error);
              alert("Error en el pago: " + err.error.error);
            } else {
              alert("Error al registrar el pago (ver consola)");
            }
          }
        });
      },
      error: (err) => {
        console.error("❌ ERROR DETALLADO DESDE EL BACKEND:", err);

        if (err.error && err.error.error) {
          console.error("📌 MENSAJE REAL DEL SERVIDOR:", err.error.error);
          alert("Error del servidor: " + err.error.error);
        } else {
          alert("Error al registrar el pedido (ver consola)");
        }
      }
    });
  }

  onMedioChange(event: any) {
    const nombreMedio = event.detail.value;
    const medio = this.mediosPago.find(m => m.nombre === nombreMedio);

    if (medio) {
      this.medioSeleccionado = medio.img;
    }
  }
}
