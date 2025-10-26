import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonMenuButton
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonMenuButton,
    RouterLink // 👈 necesario para los routerLink del HTML
  ]
})
export class HeaderComponent {
  // Puedes agregar propiedades dinámicas después si quieres (por ejemplo, el nombre del usuario)
}