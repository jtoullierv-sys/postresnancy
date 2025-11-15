import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-adminmenu',
  standalone: true,
  templateUrl: './adminmenu.component.html',
  styleUrls: ['./adminmenu.component.scss'],
  imports: [CommonModule, IonicModule, RouterLink]
})
export class AdminmenuComponent {

  constructor(private router: Router) {}

  goToInicio() {
    this.router.navigate(['/bienvenidaadmin']);
  }

  goToPostres() {
    this.router.navigate(['/mis-postres']);
  }

  goToPedidos() {
    this.router.navigate(['/mis-pedidos']);
  }

  goToReclamos() {
    this.router.navigate(['/mis-reclamos']);
  }

  goToEstadisticas() {
    this.router.navigate(['/estadisticas']);
  }

}
