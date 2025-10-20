/*import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-vercatalogo',
  templateUrl: './vercatalogo.page.html',
  styleUrls: ['./vercatalogo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class VercatalogoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}*/
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/angular/standalone';

interface Postre {
  id: number;
  descripcion: string;
  precio: number;
  imagen: string;
}

@Component({
  selector: 'app-vercatalogo',
  templateUrl: './vercatalogo.page.html',
  styleUrls: ['./vercatalogo.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonCard,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    CommonModule, 
    FormsModule
  ]
})
export class VercatalogoPage implements OnInit {

  postres: Postre[] = [
    {
      id: 1,
      descripcion: 'ALFAJORES X12',
      precio: 22.00,
      imagen: 'assets/img/alfajores.jpg'
    },
    {
      id: 2,
      descripcion: 'BROWNIE X25',
      precio: 22.00,
      imagen: 'assets/img/brownie.jpg'
    },
    {
      id: 3,
      descripcion: 'CREMA VOLTEADA',
      precio: 45.00,
      imagen: 'assets/img/crema-volteada.jpg'
    },
    {
      id: 4,
      descripcion: 'EMPANADAS X6',
      precio: 24.00,
      imagen: 'assets/img/empanadas.jpg'
    },
    {
      id: 5,
      descripcion: 'ENROLLADO DE HOT DOG X25',
      precio: 25.00,
      imagen: 'assets/img/enrollado-hotdog.jpg'
    },
    {
      id: 6,
      descripcion: 'KEKE DE ARANDANO',
      precio: 40.00,
      imagen: 'assets/img/keke-arandano.jpg'
    },
    {
      id: 7,
      descripcion: 'KEKE DE CHOCOCHIPS',
      precio: 35.00,
      imagen: 'assets/img/keke-chocochips.jpg'
    },
    {
      id: 8,
      descripcion: 'KEKE DE CHOCOLATE',
      precio: 38.00,
      imagen: 'assets/img/keke-chocolate.jpg'
    },
    {
      id: 9,
      descripcion: 'KEKE DE FRUTOS SECOS',
      precio: 42.00,
      imagen: 'assets/img/keke-frutos-secos.jpg'
    },
    {
      id: 10,
      descripcion: 'KEKE DE NARANJA',
      precio: 35.00,
      imagen: 'assets/img/keke-naranja.jpg'
    },
    {
      id: 11,
      descripcion: 'KEKE DE VAINILLA',
      precio: 35.00,
      imagen: 'assets/img/keke-vainilla.jpg'
    },
    {
      id: 12,
      descripcion: 'KEKE DE ZANAHORIA',
      precio: 38.00,
      imagen: 'assets/img/keke-zanahoria.jpg'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    // Aquí puedes cargar los postres desde un servicio/API
  }

  verDetalle(id: number) {
    this.router.navigate(['/detalle-postre', id]);
  }

}