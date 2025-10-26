import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/header/header.component';
import { FooterComponent } from 'src/app/footer/footer.component';

@Component({
  selector: 'app-acercadenosotros',
  standalone: true,
  templateUrl: './acercadenosotros.page.html',
  styleUrls: ['./acercadenosotros.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonCard,
    IonCardContent,
    HeaderComponent,
    FooterComponent
  ]
})
export class AcercadenosotrosPage implements OnInit {
  constructor() {}
  ngOnInit() {}
}
