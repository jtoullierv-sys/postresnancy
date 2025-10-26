import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonToolbar,
  IonHeader,
  IonTitle,
  IonButtons,
  IonButton,
  IonPopover,
  IonIcon,
  IonList,
  IonItem,
  IonContent
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
      IonHeader,
      IonTitle,
      IonButtons,
      IonButton,
      IonPopover,
      IonIcon,
      IonList,
      IonItem,
      IonContent,
      RouterLink
    ]
  })
  export class HeaderComponent {}
