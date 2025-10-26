import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { PostreService } from 'src/app/services/postre.service';
import { Postre, mapPostre } from 'src/app/models/postre.model';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-vercatalogo',
  standalone: true,
  templateUrl: './vercatalogo.page.html',
  styleUrls: ['./vercatalogo.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    RouterLink,
    HeaderComponent,
    FooterComponent,
  ],
})
export class VercatalogoPage implements OnInit {
  postres: Postre[] = [];

  constructor(private postreService: PostreService) {}

  ngOnInit() {
    this.postreService.obtenerPostres().subscribe((data) => {
      // 🔧 Mapea los PostreAPI → Postre
      this.postres = data.map(mapPostre);
    });
  }
}