import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-verrecibo',
  standalone: true,
  templateUrl: './verrecibo.page.html',
  styleUrls: ['./verrecibo.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonButton
  ]
})
export class VerreciboPage {

  pago = {
    fechaPago: '19/10/2025',
    medioPago: 'Yape',
  };

  pedido = {
    fechaEntrega: '22/10/2025',
    horaEntrega: '14:30',
    total: 85.90
  };

  detalles = [
    { producto: 'Cheesecake de fresa', extra: 'Sirope de fresa', cantidad: 2, subtotal: 30.00 },
    { producto: 'Pie de limón', extra: 'Sin extra', cantidad: 1, subtotal: 20.00 },
    { producto: 'Brownie', extra: 'Helado de vainilla', cantidad: 1, subtotal: 35.90 },
  ];

  imprimirBoleta() {
    window.print();
  }
}

