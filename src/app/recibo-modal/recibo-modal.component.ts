// src/app/recibo-modal/recibo-modal.component.ts
import { Component, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recibo-modal',
  standalone: true,
  templateUrl: './recibo-modal.component.html',
  styleUrls: ['./recibo-modal.component.scss'],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ReciboModalComponent {

  @Input() pedido: any | null = null;
  @Input() pago: any | null = null;

  constructor(private modalCtrl: ModalController) {}

  cerrar() {
    this.modalCtrl.dismiss();
  }

}
