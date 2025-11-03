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
import { Router, RouterLink } from '@angular/router';
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
  closeOutline, exitOutline } from 'ionicons/icons';
import { StorageService } from '../../services/storage';
import { AlertController } from '@ionic/angular';


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

  constructor(
    private alertCtrl: AlertController,
    private storage: StorageService,
    private router: Router
  ) {
    addIcons({
      menuOutline,
      personCircleOutline,
      closeOutline,
      homeOutline,
      peopleOutline,
      gridOutline,
      cartOutline,
      basketOutline,
      chatboxOutline,
      informationCircleOutline,
      exitOutline
    });
  }

  async closeMenu() {
    await this.sideMenu.dismiss();
  }

  async closeSesion() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Deseas salir de tu cuenta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Salir',
          handler: async () => {
            await this.storage.clear(); // ✅ Limpia todo el almacenamiento
            this.router.navigate(['/login']); // ✅ Redirige al login
          }
        }
      ]
    });

    await alert.present();
  }
}