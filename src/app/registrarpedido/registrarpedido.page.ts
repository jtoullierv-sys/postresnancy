import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { 
  IonContent, 
  IonCard, 
  IonCardContent, 
  IonInput, 
  IonButton,
  IonSelect, 
  IonSelectOption
} from '@ionic/angular/standalone';

import { HeaderComponent } from '../header/header.component';
import { ExtraService } from 'src/services/extra.service';
import { Extra, mapExtra } from 'src/models/extra.model';
import { CarritoService } from 'src/services/carrito.service';
import { AlertController } from '@ionic/angular';
import { StorageService } from '../../services/storage';
import { FooterComponent } from '../footer/footer.component';

interface Postre {
  id: number;
  descripcion: string;
  categoria: string;
  precio: number;
  imagen: string;
}

@Component({
  selector: 'app-registrarpedido',
  templateUrl: './registrarpedido.page.html',
  styleUrls: ['./registrarpedido.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    RouterLink,
    IonContent, 
    IonCard, 
    IonCardContent, 
    IonInput, 
    IonButton,
    IonSelect, 
    IonSelectOption,
    HeaderComponent,
    FooterComponent
  ]
})
export class RegistrarpedidoPage implements OnInit {

  postre!: Postre;
  extras: Extra[] = [];

  categoriaSeleccionada = '';
  extraSeleccionado: number | null = null;
  cantidad = 1;
  precioUnitario = 0;
  precioTotal = 0;
  usuarioLogueado = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private extraService: ExtraService,
    private carritoService: CarritoService,
    private alertCtrl: AlertController,
    private storage: StorageService
  ) {}

  ngOnInit() {
    // Recuperar datos del postre recibido por query params
    this.route.queryParams.subscribe(params => {
      if (params['postre']) {
        this.postre = JSON.parse(params['postre']);
        this.categoriaSeleccionada = this.postre.categoria;
        this.precioUnitario = this.postre.precio;
        this.precioTotal = this.postre.precio;
      }
    });

    // Cargar extras disponibles desde la API
    this.extraService.obtenerExtras().subscribe((data) => {
      this.extras = data.map(mapExtra);
    });
  }

  onCategoriaChange(event: any) {
    this.categoriaSeleccionada = event.detail.value;
  }

  onExtraChange(event: any) {
    this.extraSeleccionado = event.detail.value;
    this.calcularPrecioTotal();
  }

  onCantidadChange(event: any) {
    const valor = parseInt(event.detail.value);
    this.cantidad = Math.min(Math.max(valor || 1, 1), 20);
    this.calcularPrecioTotal();
  }

  calcularPrecioTotal() {
    const extra = this.extras.find(e => e.id === this.extraSeleccionado);
    const precioExtra = extra ? Number(extra.precio) : 0;
    const precioUnitario = Number(this.precioUnitario);
    this.precioTotal = (precioUnitario + precioExtra) * this.cantidad;
  }

  async enviarCarrito() {
    try {
      const cliente = await this.storage.get('cliente');

      if (!cliente || !cliente.id_cliente) {
        await this.mostrarAlerta('Error', 'No se encontró información del cliente. Inicia sesión nuevamente.');
        return;
      }

      if (!this.usuarioLogueado) {
        await this.mostrarAlerta('Error', 'Debes iniciar sesión para agregar al carrito.');
        return;
      }

      if (this.cantidad <= 0) {
        await this.mostrarAlerta('Error', 'La cantidad debe ser válida.');
        return;
      }

      const idExtra = this.extraSeleccionado ?? 7;

      // Enviar datos al servicio del carrito
      this.carritoService.insertarCarrito(
        this.cantidad,
        this.precioTotal,
        cliente.id_cliente,
        this.postre.id,
        idExtra
      ).subscribe({
        next: async (response) => {
          console.log('Respuesta del backend:', response);
          await this.mostrarAlerta('Éxito', 'El pedido se agregó al carrito correctamente.');
          this.router.navigate(['/vercatalogo']);
        },
        error: async (err) => {
          console.error('Error al insertar carrito:', err);
          await this.mostrarAlerta('Error', 'No se pudo registrar el pedido. Intenta nuevamente.');
        }
      });

    } catch (error) {
      console.error('Error inesperado:', error);
      await this.mostrarAlerta('Error', 'Ocurrió un problema al procesar el pedido.');
    }
  }

  cancelar() {
    this.router.navigate(['/vercatalogo']);
  }

  aumentarCantidad() {
    if (this.cantidad < 20) {
      this.cantidad++;
      this.calcularPrecioTotal();
    }
  }

  disminuirCantidad() {
    if (this.cantidad > 1) {
      this.cantidad--;
      this.calcularPrecioTotal();
    }
  }

  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}