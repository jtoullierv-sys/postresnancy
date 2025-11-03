import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { StorageService } from '../../services/storage';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

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
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor, ingrese usuario y contraseña.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    this.usuarioService.loginUsuario(this.usuario, this.password).subscribe({
      next: async (response) => {
        if (response && response.usuario) {
          await this.storage.set('usuario', response);
          this.router.navigate(['/vercatalogo']);
        } else {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'Usuario o contraseña incorrectos.',
            buttons: ['OK']
          });
          await alert.present();
        }
      },
      error: async () => {
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