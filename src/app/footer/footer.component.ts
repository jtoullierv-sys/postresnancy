import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonButton, 
  IonIcon 
} from '@ionic/angular/standalone';
import { logoFacebook, logoInstagram, logoWhatsapp } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [
    CommonModule,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,  
    IonIcon
  ]
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  constructor() {
    addIcons({ logoFacebook, logoInstagram, logoWhatsapp });
  }
}
