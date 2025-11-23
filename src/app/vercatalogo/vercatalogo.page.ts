import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
} from '@ionic/angular/standalone';
import { RouterLink, Router } from '@angular/router';
import { PostreService } from 'src/services/postre.service';
import { Postre, mapPostre } from 'src/models/postre.model';
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

  constructor(private postreService: PostreService,
              private router: Router
  ) {}

  registrarPedido(postre: any) {
    // ✅ Enviar el objeto postre serializado
    this.router.navigate(['/registrarpedido'], {
      queryParams: {
        postre: JSON.stringify(postre)
      }
    });
  }

  ngOnInit() {
    this.postreService.obtenerPostres().subscribe((data) => {
      this.postres = data.map(mapPostre);
    }); 
  }
}