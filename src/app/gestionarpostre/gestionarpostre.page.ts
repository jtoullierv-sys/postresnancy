import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonIcon,
  IonButton,
  IonList,
  IonItem,
  IonThumbnail,
  IonToggle,
  IonFab,
  IonFabButton,
  IonModal,
  IonInput
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { add, create, cube } from 'ionicons/icons';
import { addIcons } from 'ionicons';

addIcons({ add, create, cube });

interface Postre {
  id: number;
  descripcion: string;
  categoria: string;
  precio: number;
  personalizado: boolean;
  enTienda: boolean;
  imagen: string;
}

interface Extra {
  id: number;
  nombre: string;
  tipo: string;
  peso: number;
  precio: number;
  estado: boolean;
}

@Component({
  selector: 'app-gestionarpostre',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonLabel,
    IonIcon,
    IonButton,
    IonList,
    IonItem,
    IonThumbnail,
    IonToggle,
    IonFab,
    IonFabButton,
    IonModal,
    IonInput
  ],
  templateUrl: './gestionarpostre.page.html',
  styleUrls: ['./gestionarpostre.page.scss']
})
export class GestionarpostrePage {
  segment: 'postres' | 'extras' = 'postres';

  postres: Postre[] = [
    {
      id: 1,
      descripcion: 'Cheesecake de fresa',
      categoria: 'Refrigerado',
      precio: 15.5,
      personalizado: true,
      enTienda: true,
      imagen: 'https://cdn-icons-png.flaticon.com/512/1046/1046869.png'
    },
    {
      id: 2,
      descripcion: 'Brownie con helado',
      categoria: 'Repostería',
      precio: 12.0,
      personalizado: false,
      enTienda: true,
      imagen: 'https://cdn-icons-png.flaticon.com/512/926/926269.png'
    }
  ];

  extras: Extra[] = [
    { id: 1, nombre: 'Chispas de chocolate', tipo: 'Decoración', peso: 50, precio: 2.5, estado: true },
    { id: 2, nombre: 'Jarabe de fresa', tipo: 'Saborizante', peso: 100, precio: 3.0, estado: true }
  ];

  // Modal control
  showPostreModal = false;
  showExtraModal = false;
  editandoPostre: Postre | null = null;
  editandoExtra: Extra | null = null;

  toggleSegment(valor: 'postres' | 'extras') {
    this.segment = valor;
  }

  cambiarEstado(postre: Postre) {
    postre.enTienda = !postre.enTienda;
  }

  cambiarEstadoExtra(extra: Extra) {
    extra.estado = !extra.estado;
  }

  nuevoPostre() {
    this.editandoPostre = { id: 0, descripcion: '', categoria: '', precio: 0, personalizado: false, enTienda: true, imagen: '' };
    this.showPostreModal = true;
  }

  editarPostre(p: Postre) {
    this.editandoPostre = { ...p };
    this.showPostreModal = true;
  }

  guardarPostre() {
    if (this.editandoPostre) {
      if (this.editandoPostre.id === 0) {
        this.editandoPostre.id = this.postres.length + 1;
        this.postres.push(this.editandoPostre);
      } else {
        const i = this.postres.findIndex(p => p.id === this.editandoPostre!.id);
        this.postres[i] = { ...this.editandoPostre };
      }
    }
    this.showPostreModal = false;
  }

  nuevoExtra() {
    this.editandoExtra = { id: 0, nombre: '', tipo: '', peso: 0, precio: 0, estado: true };
    this.showExtraModal = true;
  }

  editarExtra(e: Extra) {
    this.editandoExtra = { ...e };
    this.showExtraModal = true;
  }

  guardarExtra() {
    if (this.editandoExtra) {
      if (this.editandoExtra.id === 0) {
        this.editandoExtra.id = this.extras.length + 1;
        this.extras.push(this.editandoExtra);
      } else {
        const i = this.extras.findIndex(x => x.id === this.editandoExtra!.id);
        this.extras[i] = { ...this.editandoExtra };
      }
    }
    this.showExtraModal = false;
  }
}