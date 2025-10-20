/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
*/
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonFooter, 
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
    IonFooter,
    IonToolbar,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon
  ]
})
export class FooterComponent {
  constructor() {
    addIcons({ logoFacebook, logoInstagram, logoWhatsapp });
  }
}
