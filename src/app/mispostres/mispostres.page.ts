import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalPostreComponent } from '../modalpostre/modalpostre.component';

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

import { AlertController, ToastController, ModalController } from '@ionic/angular';

import { addIcons } from 'ionicons';
import { addCircleOutline, createOutline, basketOutline } from 'ionicons/icons';

import { HeaderComponent } from '../header/header.component';
import { FooteradminComponent } from '../footeradmin/footeradmin.component';

// Servicios
import { PostreService } from 'src/services/postre.service';
import { ExtraService } from 'src/services/extra.service';

// Modelos + mappers
import { mapPostre, Postre } from 'src/models/postre.model';
import { mapExtra, Extra } from 'src/models/extra.model';

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
  ]
})
export class MispostresPage implements OnInit {
  activeTab: string = 'postres';
  isMobile: boolean = false;
  products: Product[] = [];

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController,
    private postreService: PostreService,
    private extraService: ExtraService
  ) {
    addIcons({ addCircleOutline, createOutline, basketOutline });
  }

  ngOnInit() {
    this.checkScreenSize();
    this.loadProducts();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
  }

  get filteredProducts(): Product[] {
    return this.products.filter(p =>
      this.activeTab === 'postres' ? p.tipo === 'postre' : p.tipo === 'extra'
    );
  }

  // ======================================================
  // 🔥 CARGA REAL DESDE API
  // ======================================================
  loadProducts() {
    this.products = []; // limpiar antes

    // --- Cargar Postres ---
    this.postreService.obtenerTodoslosPostres().subscribe({
      next: (data) => {
        const postres: Postre[] = data.map(mapPostre);
        const mappedPostres: Product[] = postres.map(p => ({
          id: p.id,
          descripcion: p.descripcion,
          categoria: p.categoria,
          precio: p.precio,
          image: p.imagen,
          enTienda: p.activo,
          tipo: 'postre'
        }));

        this.products.push(...mappedPostres);
      }
    });

    // --- Cargar Extras ---
    this.extraService.obtenerTodoslosExtras().subscribe({
      next: (data) => {
        const extras: Extra[] = data.map(mapExtra);
        const mappedExtras: Product[] = extras.map(e => ({
          id: e.id,
          descripcion: e.nombre,
          categoria: e.tipo,
          precio: e.precio,
          image: 'assets/extras/default.jpg',
          enTienda: e.estado,
          tipo: 'extra'
        }));

        this.products.push(...mappedExtras);
      }
    });
  }

  // ======================================================
  // MODALES
  // ======================================================
  async addProduct() {
    const modal = await this.modalController.create({
      component: ModalPostreComponent,
      componentProps: { modo: 'agregar' },
      cssClass: 'modal-postre'
    });

    modal.onDidDismiss().then((result) => {
      if (result.role === 'confirm') {

        const form = result.data;

        // 🔥 DATA EXACTA QUE PIDE EL BACKEND
        const newPostre = {
          descripcion_postre: form.descripcion.toUpperCase(),
          imagen_postre: form.imagen,
          categoria: form.categoria,
          precio_postre: form.precio,
          estado_postre: 1,         // SIEMPRE ACTIVO AL CREAR
          personalizacion: 0        // DE MOMENTO FIJO (o cambia según tu lógica)
        };

        this.postreService.agregarPostre(newPostre).subscribe({
          next: () => {
            this.presentToast('Postre agregado correctamente', 'success');
            this.loadProducts();
          },
          error: () => {
            this.presentToast('Error al agregar postre', 'danger');
          }
        });

      }
    });

    await modal.present();
  }

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
      if (result.role === 'confirm') {
        this.presentToast('Producto actualizado', 'success');
        this.loadProducts();
      }
    });

    await modal.present();
  }

  toggleEnTienda(product: Product, event: any) {
    const nuevoValor = event.detail.checked; 
    const nuevoEstado = nuevoValor ? 1 : 0;

    // ------------------------
    // 🔥 PARA POSTRES
    // ------------------------
    if (product.tipo === 'postre') {
      this.postreService.cambiarEstadoPostre(product.id, nuevoEstado).subscribe({
        next: () => {
          product.enTienda = nuevoValor;
          this.presentToast('Estado de postre actualizado');
        },
        error: () => {
          this.presentToast('Error al actualizar postre', 'danger');
        }
      });

      return;
    }

    this.extraService.cambiarEstadoExtra(product.id, nuevoEstado).subscribe({
      next: () => {
        product.enTienda = nuevoValor;
        this.presentToast('Estado de extra actualizado');
      },
      error: () => {
        this.presentToast('Error al actualizar extra', 'danger');
      }
    });
  }



  async presentToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}
