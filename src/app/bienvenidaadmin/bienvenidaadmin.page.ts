import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-bienvenidaadmin',
  templateUrl: './bienvenidaadmin.page.html',
  styleUrls: ['./bienvenidaadmin.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class BienvenidaadminPage implements OnInit {
  nombreUsuario: string = 'NancyVal';

  constructor() {}

  ngOnInit() {
    // Cargar nombre del usuario desde storage o servicio
    this.loadUserName();
  }

  loadUserName() {
    // Ejemplo: desde localStorage
    // const user = JSON.parse(localStorage.getItem('user') || '{}');
    // this.nombreUsuario = user.nombre || 'Usuario';
  }
}
