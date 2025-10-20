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
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonAvatar,
  IonBadge,
  AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { add, chatbubbles, trash, star, starOutline } from 'ionicons/icons';

interface Comentario {
  id: number;
  usuario: string;
  fecha: string;
  calificacion: number;
  contenido: string;
  esPropio: boolean;
}

@Component({
  selector: 'app-vercajadecomentarios',
  templateUrl: './vercajadecomentarios.page.html',
  styleUrls: ['./vercajadecomentarios.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonCard,
    IonCardContent,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonAvatar,
    IonBadge,
    CommonModule, 
    FormsModule
  ]
})
export class VercajadecomentariosPage implements OnInit {

  comentarios: Comentario[] = [
    {
      id: 1,
      usuario: 'María González',
      fecha: '2025-01-15',
      calificacion: 5,
      contenido: '¡Excelente servicio! Los postres son deliciosos y la atención es muy buena. Totalmente recomendado.',
      esPropio: false
    },
    {
      id: 2,
      usuario: 'Juan Pérez',
      fecha: '2025-01-14',
      calificacion: 4,
      contenido: 'Muy buenos postres, aunque el tiempo de entrega fue un poco largo. Pero vale la pena la espera.',
      esPropio: true
    },
    {
      id: 3,
      usuario: 'Ana Rodríguez',
      fecha: '2025-01-13',
      calificacion: 5,
      contenido: 'Los mejores brownies que he probado. La calidad es excepcional.',
      esPropio: false
    }
  ];

  usuarioLogueado: boolean = true; // Verificar desde servicio de autenticación

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {
    addIcons({ add, chatbubbles, trash, star, starOutline });
  }

  ngOnInit() {
    // Aquí deberías cargar los comentarios desde la API
    // this.cargarComentarios();
  }

  agregarComentario() {
    this.router.navigate(['/comentario']);
  }

  async eliminarComentario(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que deseas eliminar este comentario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: () => {
            // Aquí deberías llamar al servicio para eliminar
            this.comentarios = this.comentarios.filter(c => c.id !== id);
            console.log('Comentario eliminado:', id);
            this.mostrarMensaje('Comentario eliminado correctamente');
          }
        }
      ]
    });

    await alert.present();
  }

  async mostrarMensaje(mensaje: string) {
    const alert = await this.alertController.create({
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  getEstrellas(calificacion: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < calificacion);
  }

}