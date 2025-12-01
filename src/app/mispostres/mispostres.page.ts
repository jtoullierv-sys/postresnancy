  import { Component, OnInit, HostListener } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { ModalPostreComponent } from '../modalpostre/modalpostre.component';

  // Importaciones de Ionic
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

  // IMPORTANTE: ModalController para abrir el modal
  import { AlertController, ToastController, ModalController } from '@ionic/angular';

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
    providers: [ModalController, AlertController, ToastController],
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
      FooteradminComponent,
      ModalPostreComponent
      // NO necesitas importar ModalPostreComponent porque es standalone
    ]
  })
  export class MispostresPage implements OnInit {
    activeTab: string = 'postres';
    isMobile: boolean = false;
    products: Product[] = [];

    constructor(
      private alertController: AlertController,
      private toastController: ToastController,
      private modalController: ModalController // <- AGREGADO para controlar modales
    ) {
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
      // Aquí cargarás los productos desde tu backend
      // Por ahora, datos de ejemplo para que veas algo:
      this.products = [
        {
          id: 1,
          image: 'https://via.placeholder.com/150',
          descripcion: 'Torta de Chocolate',
          categoria: 'Tortas',
          precio: 45.00,
          enTienda: true,
          tipo: 'postre'
        },
        {
          id: 2,
          image: 'https://via.placeholder.com/150',
          descripcion: 'Pie de Limón',
          categoria: 'Pies',
          precio: 25.00,
          enTienda: false,
          tipo: 'postre'
        },
        {
          id: 3,
          image: 'https://via.placeholder.com/150',
          descripcion: 'Velas decorativas',
          categoria: 'Decoración',
          precio: 5.00,
          enTienda: true,
          tipo: 'extra'
        }
      ];
    }

    // ========================================
    // MÉTODO PARA AGREGAR PRODUCTO (MODAL)
    // ========================================
    async addProduct() {
      const modal = await this.modalController.create({
        component: ModalPostreComponent,
        componentProps: {
          modo: 'agregar'
        },
        cssClass: 'modal-postre' // Opcional: para estilos personalizados
      });

      // Capturar resultado cuando se cierra el modal
      modal.onDidDismiss().then((result) => {
        if (result.role === 'confirm' && result.data) {
          console.log('✅ Nuevo postre recibido:', result.data);
          
          // AQUÍ LLAMAS A TU BACKEND PARA GUARDAR
          // Ejemplo:
          // this.postreService.crear(result.data).subscribe({
          //   next: (response) => {
          //     this.presentToast('Postre agregado exitosamente', 'success');
          //     this.loadProducts(); // Recargar lista
          //   },
          //   error: (error) => {
          //     this.presentToast('Error al agregar postre', 'danger');
          //   }
          // });

          // Por ahora solo mostramos el toast
          this.presentToast('Postre agregado exitosamente', 'success');
          
          // Simular agregar a la lista local (elimina esto cuando conectes el backend)
          const nuevoProducto: Product = {
            id: this.products.length + 1,
            image: result.data.imagen || 'https://via.placeholder.com/150',
            descripcion: result.data.descripcion,
            categoria: result.data.categoria,
            precio: result.data.precio,
            enTienda: true,
            tipo: this.activeTab === 'postres' ? 'postre' : 'extra'
          };
          this.products.push(nuevoProducto);
        }
      });

      await modal.present();
    }

    // ========================================
    // MÉTODO PARA EDITAR PRODUCTO (MODAL)
    // ========================================
    async editProduct(product: Product) {
      const modal = await this.modalController.create({
        component: ModalPostreComponent,
        componentProps: {
          postre: {
            id: product.id,
            descripcion: product.descripcion,
            categoria: product.categoria,
            precio: product.precio,
            imagen: product.image
          },
          modo: 'editar'
        },
        cssClass: 'modal-postre'
      });

      modal.onDidDismiss().then((result) => {
        if (result.role === 'confirm' && result.data) {
          console.log('✅ Postre actualizado:', result.data);
          
          // AQUÍ LLAMAS A TU BACKEND PARA ACTUALIZAR
          // Ejemplo:
          // this.postreService.actualizar(result.data.id, result.data).subscribe({
          //   next: (response) => {
          //     this.presentToast('Postre actualizado exitosamente', 'success');
          //     this.loadProducts();
          //   },
          //   error: (error) => {
          //     this.presentToast('Error al actualizar postre', 'danger');
          //   }
          // });

          this.presentToast('Postre actualizado exitosamente', 'success');
          
          // Actualizar en la lista local (elimina esto cuando conectes el backend)
          const index = this.products.findIndex(p => p.id === product.id);
          if (index !== -1) {
            this.products[index] = {
              ...this.products[index],
              descripcion: result.data.descripcion,
              categoria: result.data.categoria,
              precio: result.data.precio,
              image: result.data.imagen || this.products[index].image
            };
          }
        }
      });

      await modal.present();
    }

    // ========================================
    // TOGGLE EN TIENDA
    // ========================================
    async toggleEnTienda(product: Product) {
      const status = product.enTienda ? 'visible' : 'oculto';
      
      // AQUÍ LLAMARÍAS A TU BACKEND
      // this.postreService.toggleEnTienda(product.id, product.enTienda).subscribe({
      //   next: () => {
      //     this.presentToast(`${product.descripcion} ahora está ${status}`, 'success');
      //   },
      //   error: () => {
      //     product.enTienda = !product.enTienda; // Revertir cambio
      //     this.presentToast('Error al actualizar estado', 'danger');
      //   }
      // });
      
      await this.presentToast(
        `${product.descripcion} ahora está ${status} en tienda`,
        product.enTienda ? 'success' : 'medium'
      );
    }

    // ========================================
    // HELPER: MOSTRAR TOAST
    // ========================================
    async presentToast(message: string, color: string = 'primary') {
      const toast = await this.toastController.create({
        message: message,
        duration: 2000,
        position: 'bottom',
        color: color
      });

      await toast.present();
    }
  }