import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  IonToggle,
  AlertController, 
  ToastController 
} from '@ionic/angular';
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
  selector: 'app-gestionarpostre',
  templateUrl: './gestionarpostre.page.html',
  styleUrls: ['./gestionarpostre.page.scss'],
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
export class GestionarpostrePage implements OnInit {
  activeTab: string = 'postres';
  isMobile: boolean = false;
  products: Product[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) {
    // Registrar los iconos
    addIcons({
      'add-circle-outline': addCircleOutline,
      'create-outline': createOutline,
      'basket-outline': basketOutline
    });
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
    // Aquí llamarás a tu servicio API
    // Ejemplo:
    // this.productService.getProducts().subscribe(
    //   (data: Product[]) => {
    //     this.products = data;
    //   },
    //   (error) => {
    //     this.presentToast('Error al cargar productos', 'danger');
    //     console.error('Error:', error);
    //   }
    // );
  }

  async addProduct() {
    // Aquí implementarás la lógica para agregar un producto
    // Puedes abrir un modal o navegar a otra página
    this.presentToast('Abrir formulario para agregar producto', 'primary');
  }

  async editProduct(product: Product) {
    // Aquí implementarás la lógica para editar un producto
    // Puedes abrir un modal con el formulario de edición
    this.presentToast(`Editar: ${product.descripcion}`, 'warning');
  }

  async toggleEnTienda(product: Product) {
    // Aquí llamarás a tu API para actualizar el estado
    // Ejemplo:
    // this.productService.updateProductStatus(product.id, product.enTienda).subscribe(
    //   (response) => {
    //     const status = product.enTienda ? 'visible' : 'oculto';
    //     this.presentToast(`${product.descripcion} ahora está ${status} en tienda`, product.enTienda ? 'success' : 'medium');
    //   },
    //   (error) => {
    //     product.enTienda = !product.enTienda; // Revertir el cambio en caso de error
    //     this.presentToast('Error al actualizar el estado', 'danger');
    //     console.error('Error:', error);
    //   }
    // );

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