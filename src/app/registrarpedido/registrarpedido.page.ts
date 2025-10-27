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

interface Postre {
  id: number;
  descripcion: string;
  categoria: string;
  precio: number;
  imagen: string;
}

interface Extra {
  id: number;
  nombre: string;
  precio: number;
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
  extras: Extra[] = [
    { id: 1, nombre: 'Chispas de Chocolate', precio: 3.00 },
    { id: 2, nombre: 'Frutas Frescas', precio: 5.00 },
    { id: 3, nombre: 'Crema de Mantequilla', precio: 4.00 },
    { id: 4, nombre: 'Almendras Laminadas', precio: 6.00 },
    { id: 5, nombre: 'Manjar Blanco', precio: 3.50 },
    { id: 6, nombre: 'Ganache de Chocolate', precio: 5.50 }
  ];

  categoriaSeleccionada = '';
  extraSeleccionado: number | null = null;
  cantidad = 1;
  precioUnitario = 0;
  precioTotal = 0;
  usuarioLogueado = true;

  constructor(private router: Router, private route: ActivatedRoute) {}

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
    const precioExtra = extra ? extra.precio : 0;
    this.precioTotal = (this.precioUnitario + precioExtra) * this.cantidad;
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