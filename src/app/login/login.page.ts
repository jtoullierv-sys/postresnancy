/*import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}*/
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
      this.router.navigate(['/bienvenida']);
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