
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/header/header.component';

@Component({
  selector: 'app-bienvenida',
  templateUrl: './bienvenida.page.html',
  styleUrls: ['./bienvenida.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonCard,
    IonCardContent,
    CommonModule, 
    FormsModule, 
    HeaderComponent
  ]
})
export class BienvenidaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}