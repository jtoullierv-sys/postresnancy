
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonFooter,
  IonCardContent
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/header/header.component';
import { FooterComponent } from 'src/app/footer/footer.component';

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
    IonCardHeader,
    IonFooter,
    IonCardContent,
    CommonModule, 
    FormsModule, 
    HeaderComponent,
    FooterComponent
  ]
})
export class BienvenidaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}