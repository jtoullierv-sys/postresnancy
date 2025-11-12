import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ClienteService } from '../../services/cliente.service';
import { StorageService } from '../../services/storage';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    CommonModule,       
    FormsModule,       
    IonicModule,        
    RouterModule,    
    HeaderComponent,   
    FooterComponent      
  ]
})
export class LoginPage implements OnInit {

  usuario: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private usuarioService: UsuarioService,
    private clienteService: ClienteService,
    private storage: StorageService
  ) {}

  async ngOnInit() {
    const usuarioGuardado = await this.storage.get('usuario');
    if (usuarioGuardado) {
      this.router.navigate(['/vercatalogo']);
    }
  }

  async login() {
    if (!this.usuario || !this.password) {
      await this.mostrarAlerta('Error', 'Por favor, ingrese usuario y contraseña.');
      return;
    }

    try {
      // Llamada al servicio de login
      this.usuarioService.loginUsuario(this.usuario, this.password).subscribe({
        next: async (response) => {
          if (response && response.usuario) {
            // Guardar usuario base
            await this.storage.set('usuario', response);
            try {
              this.clienteService.obtenerCliente(this.usuario).subscribe({
                next: async (clienteResponse: any) => {
                  const cliente: Cliente = {
                    id_cliente: clienteResponse.id_cliente,
                    id_usuario: response.usuario.id_usuario ?? 0, // opcional según tu API
                    cli_nom: clienteResponse.nombre_cliente,
                    cli_correo: clienteResponse.correo_cliente
                  };

                  await this.storage.set('cliente', cliente);
                  this.router.navigate(['/vercatalogo']);
                },
                error: async (err) => {
                  console.error('Error obteniendo cliente:', err);
                  await this.mostrarAlerta('Advertencia', 'No se pudo obtener la información del cliente.');
                  this.router.navigate(['/vercatalogo']);
                }
              });
            } catch (clienteError) {
              console.error('Excepción al obtener cliente:', clienteError);
              await this.mostrarAlerta('Advertencia', 'No se pudo obtener el cliente asociado.');
              this.router.navigate(['/vercatalogo']);
            }

          } else {
            await this.mostrarAlerta('Error', 'Usuario o contraseña incorrectos.');
          }
        },
        error: async (err) => {
          console.error('Error en login:', err);
          await this.mostrarAlerta('Error', 'Error de conexión con el servidor.');
        }
      });

    } catch (error) {
      console.error('Excepción en login:', error);
      await this.mostrarAlerta('Error', 'Ocurrió un problema inesperado.');
    }
  }

  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}
