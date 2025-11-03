import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';

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
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-registrarusuario',
  templateUrl: './registrarusuario.page.html',
  styleUrls: ['./registrarusuario.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    HeaderComponent
  ]
})
export class RegistrarusuarioPage {

  nombre = '';
  dni = '';
  correo = '';
  usuario = '';
  contrasena = '';
  confirmarContrasena = '';

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private alertCtrl: AlertController
  ) {}

  async registrarusuario() {
    if (!this.nombre || !this.dni || !this.correo || !this.usuario || !this.contrasena) {
      const alert = await this.alertCtrl.create({
        header: 'Campos incompletos',
        message: 'Por favor, completa todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    if (this.contrasena !== this.confirmarContrasena) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // ✅ Enviar datos al backend
    this.usuarioService.registrarUsuario(this.usuario, this.contrasena).subscribe({
      next: async (response) => {
        console.log('Respuesta del backend:', response);

        if (response && response.usuario) {
          const alert = await this.alertCtrl.create({
            header: 'Registro exitoso 🎉',
            message: `Usuario ${response.usuario} registrado correctamente. Ahora puedes iniciar sesión.`,
            buttons: ['OK']
          });
          await alert.present();

          // ✅ Redirigir al login
          this.router.navigate(['/login']);
        } else {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'No se pudo registrar el usuario. Verifica los datos.',
            buttons: ['OK']
          });
          await alert.present();
        }
      },
      error: async (err) => {
        console.error('Error en el registro:', err);
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Error de conexión con el servidor.',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
}