import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-gestionarpostres',
  templateUrl: './gestionarpostres.page.html',
  styleUrls: ['./gestionarpostres.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GestionarpostresPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
