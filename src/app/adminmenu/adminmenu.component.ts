import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-adminmenu',
  templateUrl: './adminmenu.component.html',
  styleUrls: ['./adminmenu.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class AdminmenuComponent {

  usuario: any = null;

  menuItems = [
    { icon: '🏠', label: 'Inicio', route: '/admin' },
    { icon: '👩‍🍳', label: 'Registrar Personalizado', route: '/registrar-personalizado' },
    { icon: '🍰', label: 'Mis Postres', route: '/mis-postres' },
    { icon: '🧾', label: 'Mis Pedidos', route: '/mis-pedidos' },
    { icon: '❗', label: 'Mis Reclamos', route: '/mis-reclamos' },
    { icon: '📊', label: 'Mis Estadísticas', route: '/mis-estadisticas' }
  ];

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private storage: Storage,
    private menuController: MenuController
  ) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  // MÉTODO DE CERRAR SESIÓN (tal como lo pediste)
  async closeSesion() {
    const alert = await this.alertCtrl.create({
      header: 'Cerrar sesión',
      message: '¿Deseas salir de tu cuenta?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salir',
          handler: async () => {
            await this.menuController.close('main-menu');
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
