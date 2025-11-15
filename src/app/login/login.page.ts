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
    private storage: StorageService,
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

  this.usuarioService.loginUsuario(this.usuario, this.password).subscribe({
    next: async (response) => {

        if (!response || !response.usuario) {
          await this.mostrarAlerta('Error', 'Usuario o contraseña incorrectos.');
          return;
        }

        await this.storage.set('usuario', response);

        const idUsuario = response.id_usuario;
        this.usuarioService.esAdmin(idUsuario).subscribe({
          next: async (adminResp) => {

            const esAdmin = adminResp?.esAdmin === true;

            if (esAdmin) {
              this.router.navigate(['/bienvenidaadmin']);
              return; 
            }

            this.clienteService.obtenerCliente(this.usuario).subscribe({
              next: async (clienteResponse) => {

                if (!clienteResponse || !clienteResponse.id_cliente) {
                  await this.mostrarAlerta('Error', 'Usuario no encontrado.');
                  return;
                }

                const cliente: Cliente = {
                  id_cliente: clienteResponse.id_cliente,
                  id_usuario: idUsuario,
                  cli_nom: clienteResponse.cli_nom,
                  cli_correo: clienteResponse.cli_correo,
                };

                await this.storage.set('cliente', cliente);

                this.router.navigate(['/vercatalogo']);
              },
              error: async () => {
                await this.mostrarAlerta('Error', 'Usuario no encontrado.');
              }
            });

          },

          error: () => {
            this.clienteService.obtenerCliente(this.usuario).subscribe({
              next: async (clienteResponse) => {

                if (!clienteResponse || !clienteResponse.id_cliente) {
                  await this.mostrarAlerta('Error', 'Usuario no encontrado.');
                  return;
                }

                const cliente: Cliente = {
                  id_cliente: clienteResponse.id_cliente,
                  id_usuario: idUsuario,
                  cli_nom: clienteResponse.cli_nom,
                  cli_correo: clienteResponse.cli_correo,
                };

                await this.storage.set('cliente', cliente);

                this.router.navigate(['/vercatalogo']);
              },
              error: async () => {
                await this.mostrarAlerta('Error', 'Usuario no encontrado.');
              }
            });
          }
        });
      },

      error: async () => {
        await this.mostrarAlerta('Error', 'Usuario o contraseña incorrectos.');
      }
    });
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
