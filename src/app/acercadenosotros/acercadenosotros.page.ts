/*import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-acercadenosotros',
  templateUrl: './acercadenosotros.page.html',
  styleUrls: ['./acercadenosotros.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AcercadenosotrosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}*/
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

@Component({
  selector: 'app-acercadenosotros',
  templateUrl: './acercadenosotros.page.html',
  styleUrls: ['./acercadenosotros.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonCard,
    IonCardContent,
    CommonModule, 
    FormsModule
  ]
})
export class AcercadenosotrosPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}