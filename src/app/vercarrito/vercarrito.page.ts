import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component'; 
import { CarritoService } from 'src/services/carrito.service';
import { StorageService } from 'src/services/storage';
import { addIcons } from 'ionicons';
import { closeCircleOutline, cartOutline } from 'ionicons/icons'; // nota: "cartOutline", no "carOutline"

@Component({
  selector: 'app-vercarrito',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    IonicModule
  ],
  templateUrl: './vercarrito.page.html',
  styleUrls: ['./vercarrito.page.scss']
})
export class VercarritoPage implements OnInit {

  elementos: any[] = [];
  cargando = true;

  constructor(
    private carritoService: CarritoService,
    private storage: StorageService,
    private alertCtrl: AlertController
  ) {
    // 👇 Registrar los íconos correctamente aquí:
    addIcons({ closeCircleOutline, cartOutline });
  }

  async ngOnInit() {
    await this.cargarCarrito();
  }

  async cargarCarrito() {
    try {
      const cliente = await this.storage.get('cliente');
      if (!cliente || !cliente.id_cliente) {
        await this.mostrarAlerta('Error', 'No se encontró el cliente. Inicia sesión nuevamente.');
        this.cargando = false;
        return;
      }

      this.carritoService.obtenerCarrito(cliente.id_cliente).subscribe({
        next: (data) => {
          this.elementos = data.map((item: any) => ({
            id_carrito: item.id_carrito,
            nombre: item.postre.descripcion_postre,
            cantidad: item.cantidad_postre,
            precio: parseFloat(item.subtotal_carrito),
            imagen: item.postre.imagen_postre,
            extra: item.extra.nombre_extra
          }));
          this.cargando = false;
        },
        error: async (err) => {
          console.error('Error al obtener carrito:', err);
          await this.mostrarAlerta('Error', 'No se pudo obtener el carrito.');
          this.cargando = false;
        }
      });

    } catch (error) {
      console.error('Error inesperado:', error);
      await this.mostrarAlerta('Error', 'Ocurrió un problema al cargar el carrito.');
      this.cargando = false;
    }
  }

  get total(): number {
    return this.elementos.reduce((sum, e) => sum + e.precio, 0);
  }

  eliminarElemento(id: number) {
    this.elementos = this.elementos.filter(e => e.id_carrito !== id);
  }

  irAlPago() {
    console.log('Ir al pago con total:', this.total);
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
