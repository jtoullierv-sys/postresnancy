import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// 1. IMPORTACIÓN CORREGIDA PARA COMPONENTES STANDALONE
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonSegment, 
  IonSegmentButton, 
  IonLabel, 
  IonButton, 
  IonIcon, 
  IonCard, 
  IonCardContent, 
  IonToggle
} from '@ionic/angular/standalone';

// 2. LOS CONTROLADORES (SERVICIOS) SE MANTIENEN AQUÍ
import { AlertController, ToastController } from '@ionic/angular';

import { addIcons } from 'ionicons';
import { addCircleOutline, createOutline, basketOutline } from 'ionicons/icons';
import { HeaderComponent } from '../header/header.component';
import { FooteradminComponent } from '../footeradmin/footeradmin.component';

interface Product {
  id: number;
  image: string;
  descripcion: string;
  categoria: string;
  precio: number;
  enTienda: boolean;
  tipo: 'postre' | 'extra';
}

@Component({
  selector: 'app-mispostres',
  templateUrl: './mispostres.page.html',
  styleUrls: ['./mispostres.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonButton,
    IonIcon,
    IonCard,
    IonCardContent,
    IonToggle, 
    HeaderComponent,
    FooteradminComponent
  ]
})
export class MispostresPage implements OnInit {
  activeTab: string = 'postres';
  isMobile: boolean = false;
  products: Product[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    // 3. CORRECCIÓN DE ICONOS (Sin duplicados)
    addIcons({ addCircleOutline, createOutline, basketOutline });
  }

  ngOnInit() {
    this.checkScreenSize();
    this.loadProducts();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  get filteredProducts(): Product[] {
    return this.products.filter(product => {
      if (this.activeTab === 'postres') {
        return product.tipo === 'postre';
      } else {
        return product.tipo === 'extra';
      }
    });
  }

  loadProducts() {
    // Lógica futura para cargar productos
    // this.products = ...
  }

  async addProduct() {
    this.presentToast('Abrir formulario para agregar producto', 'primary');
  }

  async editProduct(product: Product) {
    this.presentToast(`Editar: ${product.descripcion}`, 'warning');
  }

  async toggleEnTienda(product: Product) {
    const status = product.enTienda ? 'visible' : 'oculto';
    await this.presentToast(
      `${product.descripcion} ahora está ${status} en tienda`,
      product.enTienda ? 'success' : 'medium'
    );
  }

  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: color,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ]
    });

    await toast.present();
  }
}