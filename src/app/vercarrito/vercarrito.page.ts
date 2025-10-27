import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component'; 

@Component({
  selector: 'app-vercarrito',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    IonicModule
  ],
  templateUrl: './vercarrito.page.html',
  styleUrls: ['./vercarrito.page.scss']
})
export class VercarritoPage {
  elementos = [
    // Ejemplo temporal — puedes reemplazarlo por tus datos reales
    { id: 1, nombre: 'Brownie', cantidad: 2, precio: 8.5, imagen: 'assets/img/brownie.jpg' },
    { id: 2, nombre: 'Cheesecake', cantidad: 1, precio: 12.0, imagen: 'assets/img/cheesecake.jpg' }
  ];

  get total(): number {
    return this.elementos.reduce((sum, e) => sum + e.precio * e.cantidad, 0);
  }

  eliminarElemento(id: number) {
    this.elementos = this.elementos.filter(e => e.id !== id);
  }

  irAlPago() {
    // Aquí podrías navegar al componente de pago
    console.log('Ir al pago con total:', this.total);
  }
}