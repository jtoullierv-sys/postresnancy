import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar,
  IonCard, IonCardContent, IonInput, IonButton,
  IonSelect, IonSelectOption, IonLabel
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { ExtraService } from 'src/app/services/extra.service';
import { Extra, mapExtra } from 'src/app/models/extra.model';

interface Postre {
  id: number;
  descripcion: string;
  categoria: string;
  precio: number;
  imagen: string;
}

@Component({
  selector: 'app-registrarpedido',
  templateUrl: './registrarpedido.page.html',
  styleUrls: ['./registrarpedido.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    IonContent, IonHeader, IonToolbar, IonTitle,
    IonCard, IonCardContent, IonInput, IonButton,
    IonSelect, IonSelectOption, IonLabel, HeaderComponent
  ]
})
export class RegistrarpedidoPage implements OnInit {

  postre!: Postre; // se llenará con el parámetro recibido

  categorias = ['POSTRE', 'BOCADITO'];

  extras: Extra[] = [];

  categoriaSeleccionada = '';
  extraSeleccionado: number | null = null;
  cantidad = 1;
  precioUnitario = 0;
  precioTotal = 0;
  usuarioLogueado = true;

  constructor(private router: Router, private route: ActivatedRoute, private extraService: ExtraService) {}

  ngOnInit() {
    // 🔹 Obtener el parámetro desde la URL
    this.route.queryParams.subscribe(params => {
      if (params['postre']) {
        this.postre = JSON.parse(params['postre']);
        this.categoriaSeleccionada = this.postre.categoria;
        this.precioUnitario = this.postre.precio;
        this.precioTotal = this.postre.precio;
      }
    });

    this.extraService.obtenerExtras().subscribe((data) => {
          // 🔧 Mapea los PostreAPI → Postre
          this.extras = data.map(mapExtra);
    }); 
  }

  onCategoriaChange(event: any) {
    this.categoriaSeleccionada = event.detail.value;
  }

  onExtraChange(event: any) {
    this.extraSeleccionado = event.detail.value;
    this.calcularPrecioTotal();
  }

  onCantidadChange(event: any) {
    const valor = parseInt(event.detail.value);
    this.cantidad = Math.min(Math.max(valor || 1, 1), 20);
    this.calcularPrecioTotal();
  }

  calcularPrecioTotal() {
  const extra = this.extras.find(e => e.id === this.extraSeleccionado);
  const precioExtra = extra ? Number(extra.precio) : 0;
  const precioUnitario = Number(this.precioUnitario);
  this.precioTotal = (precioUnitario + precioExtra) * this.cantidad;
}

  enviarCarrito() {
    if (!this.usuarioLogueado) {
      alert('Debes iniciar sesión para agregar al carrito');
      return;
    }

    const pedido = {
      id_postre: this.postre.id,
      categoria: this.categoriaSeleccionada,
      id_extra: this.extraSeleccionado,
      cantidad: this.cantidad,
      subtotal: this.precioTotal
    };

    console.log('Enviando al carrito:', pedido);
    alert('¡Producto agregado al carrito!');
    this.router.navigate(['/vercatalogo']);
  }

  cancelar() {
    this.router.navigate(['/vercatalogo']);
  }

  aumentarCantidad() {
  if (this.cantidad < 20) {
    this.cantidad++;
    this.calcularPrecioTotal();
  }
}

disminuirCantidad() {
  if (this.cantidad > 1) {
    this.cantidad--;
    this.calcularPrecioTotal();
  }
}
}