import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonImg,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-registrarpago',
  standalone: true,
  templateUrl: './registrarpago.page.html',
  styleUrls: ['./registrarpago.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonImg,
    IonButton
  ]
})
export class RegistrarpagoPage {
  totalp: number = 120.50; // ejemplo
  fechaActual: string = new Date().toLocaleDateString('es-PE');
  fentrega: string = '';
  hentrega: string = '';
  numero: string = '';
  comprobante: any = null;

  mediosPago = [
    { nombre: 'Yape', img: 'assets/img/qryape.jpeg' },
    { nombre: 'Plin', img: 'assets/img/qrplin.jpeg' },
    { nombre: 'Tunki', img: 'assets/img/qrtunki.jpeg' },
  ];

  medioSeleccionado = this.mediosPago[0].img;

  onMedioChange(event: any) {
    const medio = this.mediosPago.find(m => m.nombre === event.detail.value);
    this.medioSeleccionado = medio ? medio.img : this.mediosPago[0].img;
  }

  onFileChange(event: any) {
    this.comprobante = event.target.files[0];
  }

  confirmarPago() {
    console.log({
      totalp: this.totalp,
      fentrega: this.fentrega,
      hentrega: this.hentrega,
      numero: this.numero,
      medio: this.medioSeleccionado,
      comprobante: this.comprobante
    });
    alert('Pago confirmado correctamente ✅');
  }
}
