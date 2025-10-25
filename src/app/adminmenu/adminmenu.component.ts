import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminmenu',
  templateUrl: './adminmenu.component.html',
  styleUrls: ['./adminmenu.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class AdminmenuComponent {
  menuItems = [
    {
      icon: '🏠',
      label: 'Inicio',
      route: '/admin'
    },
    {
      icon: '👩‍🍳',
      label: 'Registrar Personalizado',
      route: '/registrar-personalizado'
    },
    {
      icon: '🍰',
      label: 'Mis Postres',
      route: '/mis-postres'
    },
    {
      icon: '🧾',
      label: 'Mis Pedidos',
      route: '/mis-pedidos'
    },
    {
      icon: '❗',
      label: 'Mis Reclamos',
      route: '/mis-reclamos'
    },
    {
      icon: '📊',
      label: 'Mis Estadísticas',
      route: '/mis-estadisticas'
    }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}