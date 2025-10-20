import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardContent,
  IonInput,
  IonTextarea,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { star, starOutline, send } from 'ionicons/icons';

@Component({
  selector: 'app-registrarcomentario',
  templateUrl: './registrarcomentario.page.html',
  styleUrls: ['./registrarcomentario.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonCard,
    IonCardContent,
    IonInput,
    IonTextarea,
    IonButton,
    IonIcon,
    CommonModule, 
    FormsModule
  ]
})
export class RegistrarcomentarioPage implements OnInit {

  usuario: string = 'Usuario Ejemplo'; // Aquí deberías traer el nombre del usuario logueado
  calificacion: number = 0;
  comentario: string = '';
  estrellas: number[] = [1, 2, 3, 4, 5];

  constructor() {
    addIcons({ star, starOutline, send });
  }

  ngOnInit() {
    // Aquí puedes cargar el nombre del usuario desde un servicio
  }

  seleccionarCalificacion(valor: number) {
    this.calificacion = valor;
  }

  enviarComentario() {
    if (this.calificacion === 0) {
      alert('Por favor, selecciona una calificación');
      return;
    }

    if (!this.comentario.trim()) {
      alert('Por favor, escribe un comentario');
      return;
    }

    const datos = {
      nombre: this.usuario,
      calificacion: this.calificacion,
      comentario: this.comentario
    };

    console.log('Enviando comentario:', datos);
    
    // Aquí deberías llamar a tu servicio para enviar el comentario a la API
    // Ejemplo: this.comentarioService.registrar(datos).subscribe(...)

    // Resetear formulario
    this.calificacion = 0;
    this.comentario = '';
    
    alert('¡Comentario enviado exitosamente!');
  }

}