import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonModal,
  IonContent
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  personCircleOutline,
  menuOutline,
  homeOutline,
  peopleOutline,
  gridOutline,
  cartOutline,
  basketOutline,
  chatboxOutline,
  informationCircleOutline,
  closeOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    IonModal,
    IonContent,
    RouterLink
  ]
})
export class HeaderComponent {
  @ViewChild('sideMenu') sideMenu!: IonModal;

  constructor() {
    addIcons({
      personCircleOutline,
      menuOutline,
      homeOutline,
      peopleOutline,
      gridOutline,
      cartOutline,
      basketOutline,
      chatboxOutline,
      informationCircleOutline,
      closeOutline
    });
  }

  async closeMenu() {
    await this.sideMenu.dismiss();
  }
}