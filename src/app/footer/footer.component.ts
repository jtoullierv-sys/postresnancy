import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  IonFooter,
  IonToolbar,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { homeOutline, pricetagsOutline, cartOutline, cubeOutline, gridOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [CommonModule, IonFooter, IonToolbar, IonButton, IonIcon, RouterLink]
})
export class FooterComponent {
  constructor() {
    addIcons({homeOutline,gridOutline,cartOutline,cubeOutline,pricetagsOutline});
  }
}
