import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonLabel,
  IonItem,
  IonBadge,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { trash, receiptOutline, alertCircleOutline } from 'ionicons/icons';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

import { Pedido, mapPedido } from 'src/models/pedido.model';
import { PedidoService } from 'src/services/pedido.service';
import { StorageService } from 'src/services/storage';

@Component({
  selector: 'app-verestadopedido',
  templateUrl: './verestadopedido.page.html',
  styleUrls: ['./verestadopedido.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonCard,
    IonLabel,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonBadge,
    IonButton,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    CommonModule,
    HeaderComponent,
    FooterComponent
  ],
})
export class VerestadopedidoPage implements OnInit {

  segmento = 'activos';
  etapas = ['Recibido', 'Preparando', 'Enviado', 'Entregado'];

  pedidosActivos: Pedido[] = [];
  pedidosCancelados: Pedido[] = [];
  pedidosFinalizados: Pedido[] = [];

  constructor(
    private pedidoService: PedidoService,
    private storage: StorageService
  ) {
    addIcons({ trash, receiptOutline, alertCircleOutline });
  }

  async ngOnInit() {
    await this.cargarPedidos();
  }

  async cargarPedidos() {
    const cliente = await this.storage.get('cliente');

    if (!cliente || !cliente.id_cliente) {
      console.error('❌ No se encontró el cliente en storage');
      return;
    }

    this.pedidoService.obtenerPedidos(cliente.id_cliente).subscribe({
      next: (data) => {
        const pedidos = data.map(mapPedido);

        this.pedidosActivos = pedidos.filter(p => p.id_estadopedido >= 1 && p.id_estadopedido <= 5);
        this.pedidosFinalizados = pedidos.filter(p => p.id_estadopedido === 6);
        this.pedidosCancelados = pedidos.filter(p => p.id_estadopedido > 6);
      },
      error: (err) => {
        console.error('Error al obtener pedidos', err);
      }
    });
  }

  cambiarSegmento(event: any) {
    this.segmento = event.detail.value;
  }

  obtenerColor(estado: number, paso: number): string {
    if (estado === 6) return paso <= 4 ? 'success' : 'medium';
    if (estado > 6) return paso <= 4 ? 'danger' : 'medium';
    return paso <= estado ? 'primary' : 'medium';
  }

  async cancelarPedido(id: number) {
    const confirmar = confirm("¿Seguro que deseas cancelar este pedido?");
    if (!confirmar) return;

    this.pedidoService.cancelarPedido(id).subscribe({
      next: async (response) => {
        console.log('Respuesta del backend:', response);

        await this.mostrarAlerta('Éxito', 'El pedido fue cancelado correctamente.');
        await this.cargarPedidos();
      },
      error: async (err) => {
        console.error('Error al cancelar pedido', err);
        await this.mostrarAlerta('Error', 'No se pudo cancelar el pedido.');
      }
    });
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = document.createElement('ion-alert');
    alert.header = header;
    alert.message = message;
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();
  }

  verRecibo(id: number) {
    alert(`Mostrando recibo del pedido ${id}`);
  }

  reclamarPedido(id: number) {
    alert(`Reclamando pedido ${id}`);
  }
}

