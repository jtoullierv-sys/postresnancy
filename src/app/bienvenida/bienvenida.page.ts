import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoFacebook, logoInstagram, logoWhatsapp } from 'ionicons/icons'; 
import { HeaderComponent } from 'src/app/header/header.component';
import { FooterComponent } from '../footer/footer.component';
@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonCard,
    IonCardContent,
    IonButton,
    IonIcon,
    CommonModule, 
    FormsModule, 
    HeaderComponent,
    FooterComponent
  ]
})
export class BienvenidaPage implements OnInit {

  constructor() {
    addIcons({ logoFacebook, logoInstagram, logoWhatsapp});
  }

  ngOnInit() {}
}
