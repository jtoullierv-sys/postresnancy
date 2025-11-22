import { Component } from '@angular/core';
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
export class VerestadopedidoPage {
  segmento = 'activos';

  etapas = ['Recibido', 'Preparando', 'Enviado', 'Entregado'];
  contadorpedido = 1;

  pedidosActivos = [
    { id: 1, estado: 2 },
    { id: 2, estado: 3 },
  ];

  pedidosCancelados = [
    { id: 3, estado: 7 },
  ];

  pedidosFinalizados = [
    { id: 4, estado: 6 },
  ];

  constructor() {
    addIcons({ trash, receiptOutline, alertCircleOutline });
  }

  cambiarSegmento(event: any) {
    this.segmento = event.detail.value;
  }

  obtenerColor(estado: number, paso: number): string {
    if (estado === 6) return paso <= estado - 2 ? 'success' : 'medium';
    if (estado > 6) return paso <= 4 ? 'danger' : 'medium';
    return paso <= estado ? 'primary' : 'medium';
  }

  cancelarPedido(id: number) {
    alert(`Cancelando pedido ${id}`);
  }

  verRecibo(id: number) {
    alert(`Mostrando recibo del pedido ${id}`);
  }

  reclamarPedido(id: number) {
    alert(`Reclamando pedido ${id}`);
  }

}