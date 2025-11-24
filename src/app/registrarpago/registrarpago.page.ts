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

  totalp: number = 0.0;
  fechaActual: string = new Date().toLocaleDateString('es-PE');
  fentrega = '';
  hentrega = '';
  numero = '';

  archivoComprobante: File | null = null;  // <-- ARCHIVO REAL

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

    if (file) {
      this.archivoComprobante = file;
      console.log("📁 Archivo seleccionado:", file);
    }
  }

  confirmarPago() {

  if (!this.fentrega || !this.hentrega || !this.numero) {
    alert("Debe completar fecha, hora y número de contacto.");
    return;
  }

  if (!this.archivoComprobante) {
    alert("Debe subir un comprobante de pago.");
    return;
  }

  console.log("📦 Registrando pedido y pago + imagen...");

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

      // -----------------------------
      // 1️⃣ CREAR FORMDATA CON TODO
      // -----------------------------
      const nombre_img = id_pedido+"-"+this.idCliente+".jpeg";
      
      const formData = new FormData();
      formData.append('id_pedido', id_pedido);
      formData.append('medio_pago', this.medioSeleccionado);
      formData.append('fecha_pago', new Date().toISOString());
      formData.append('imagen', this.archivoComprobante!, nombre_img);

      // -----------------------------
      // 2️⃣ ENVIAR TODO EN UNA SOLA PETICIÓN
      // -----------------------------
      this.pagoService.registrarPagoConImagen(formData)
      .subscribe({
        next: (resp) => {
          console.log("✔ Pago + imagen registrado:", resp);
          alert("Pago registrado correctamente");
          this.router.navigate(['/vercatalogo']);
        },
        error: (err) => {
          console.error("❌ Error registrando pago con comprobante:", err);
          alert("Error al registrar el pago.");
        }
      });

    },
    error: (err) => {
      console.error("❌ Error registrando pedido:", err);
      alert("Error al registrar el pedido.");
    }
  });
}

  onMedioChange(event: any) {
    const medio = this.mediosPago.find(m => m.nombre === event.detail.value);
    if (medio) this.medioSeleccionado = medio.img;
  }
}
