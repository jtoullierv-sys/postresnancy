import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { UsuarioService } from 'src/services/usuario.service';
import { ClienteService } from 'src/services/cliente.service';


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
import { Cliente } from 'src/models/cliente.model';

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
      private alertCtrl: AlertController,
      private clienteService: ClienteService
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

  // Paso 1️⃣ - Registrar usuario
      this.usuarioService.registrarUsuario(this.usuario, this.contrasena).subscribe({
        next: async (response) => {
          console.log('Respuesta registrarUsuario:', response);

          if (response && response.id_usuario) {
            const idUsuario = response.id_usuario;
            console.log('ID usuario obtenido:', idUsuario);

            // Paso 2️⃣ - Registrar cliente
            const nuevoCliente = {
              id_cliente: Number(this.dni),   // convertir a número si es string
              id_usuario: idUsuario,
              cli_nom: this.nombre,
              cli_correo: this.correo
            };

            console.log('Objeto cliente a enviar:', nuevoCliente);

            this.clienteService.insertarCliente(nuevoCliente).subscribe({
              next: async (resCliente) => {
                console.log('Cliente registrado:', resCliente);
                const alert = await this.alertCtrl.create({
                  header: 'Registro exitoso 🎉',
                  message: `Usuario ${response.usuario} y cliente ${this.nombre} registrados correctamente.`,
                  buttons: ['OK']
                });
                await alert.present();
                this.router.navigate(['/login']);
              },
              error: async (err) => {
                console.error('❌ Error insertando cliente:', err);
                const alert = await this.alertCtrl.create({
                  header: 'Error',
                  message: 'No se pudo registrar el cliente. Verifica el backend.',
                  buttons: ['OK']
                });
                await alert.present();
              }
            });

          } else {
            const alert = await this.alertCtrl.create({
              header: 'Error',
              message: 'No se pudo registrar el usuario.',
              buttons: ['OK']
            });
            await alert.present();
          }
        },
        error: async (err) => {
          console.error('❌ Error registrando usuario:', err);
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