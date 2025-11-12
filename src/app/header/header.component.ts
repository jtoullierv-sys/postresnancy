import { Component, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonButtons, IonButton,
  IonIcon, IonModal, IonContent, AlertController
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  personCircleOutline, menuOutline, homeOutline, peopleOutline,
  gridOutline, cartOutline, chatboxOutline, informationCircleOutline,
  closeOutline, exitOutline
} from 'ionicons/icons';
import { StorageService } from '../../services/storage';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule, IonHeader, IonToolbar, IonButtons,
    IonButton, IonIcon, IonModal, IonContent, RouterLink
  ]
})
export class HeaderComponent implements OnInit {
  @ViewChild('sideMenu') sideMenu!: IonModal;
  usuario: any = null;

  constructor(
    private alertCtrl: AlertController,
    private storage: StorageService,
    private router: Router
  ) {
    addIcons({
      menuOutline, personCircleOutline, closeOutline,
      homeOutline, peopleOutline, gridOutline, cartOutline,
      chatboxOutline, informationCircleOutline, exitOutline
    });
  }

  async ngOnInit() {
  const userData = await this.storage.get('usuario');
  console.log('Datos del usuario desde Storage:', userData);

  if (userData) {
    // Caso principal: el objeto tiene la propiedad "usuario"
    this.usuario = {
      nombre: userData.usuario,
    };
  } else if (userData) {
    // Caso alternativo: el objeto se guardó directamente
    this.usuario = {
      nombre: userData.usuario || userData.nombre
    };
  } else {
    // No hay sesión activa
    this.usuario = null;
  }
}

  async closeMenu() {
    await this.sideMenu.dismiss();
  }

  async closeSesion() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Deseas salir de tu cuenta?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salir',
          handler: async () => {
            await this.storage.clear();
            this.usuario = null;
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }
}
