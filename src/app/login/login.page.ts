import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertController, 
         IonContent, 
         IonCard, 
         IonCardHeader,
         IonCardTitle, 
         IonCardContent, 
         IonItem, 
         IonLabel, 
         IonInput, 
         IonButton } from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
    HeaderComponent,
    FooterComponent,
    IonButton
  ]
})
export class LoginPage {

  usuario: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  async login() {
    // Ejemplo de validación local
    if (this.usuario === 'admin' && this.password === '1234') {
      this.router.navigate(['/vercatalogo']);
    } else {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}