import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  IonContent, 
  IonCard, 
  IonCardHeader,
  IonCardTitle, 
  IonCardContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-registrarusuario',
  templateUrl: './registrarusuario.page.html',
  styleUrls: ['./registrarusuario.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton
  ]
})
export class RegistrarusuarioPage {

  nombre = '';
  dni = '';
  correo = '';
  usuario = '';
  contrasena = '';
  confirmarContrasena = '';

  constructor(private router: Router) {}

  registrarusuario() {
    if (!this.nombre || !this.dni || !this.correo || !this.usuario || !this.contrasena) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    if (this.contrasena !== this.confirmarContrasena) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // 👉 Aquí puedes luego hacer una llamada HTTP a tu backend PHP
    console.log('Datos del formulario:', {
      nombre: this.nombre,
      dni: this.dni,
      correo: this.correo,
      usuario: this.usuario,
      contrasena: this.contrasena
    });

    alert('Registro exitoso 🎉');
    this.router.navigate(['/login']);
  }
}
