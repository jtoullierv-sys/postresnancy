import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  IonContent, 
  IonHeader, 
  IonTitle, 
  IonToolbar,
  IonCard,
  IonCardContent,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonLabel
} from '@ionic/angular/standalone';

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
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar,
    IonCard,
    IonCardContent,
    IonInput,
    IonButton,
    IonSelect,
    IonSelectOption,
    IonLabel,
    CommonModule, 
    FormsModule
  ]
})
export class RegistrarpedidoPage implements OnInit {

  postre: Postre = {
    id: 1,
    descripcion: 'BROWNIE x25',
    categoria: 'BOCADITO',
    precio: 22.00,
    imagen: 'assets/img/brownie.jpg'
  };

  categorias: string[] = ['POSTRE', 'BOCADITO'];

  extras: Extra[] = [
    { id: 1, nombre: 'Chispas de Chocolate', precio: 3.00 },
    { id: 2, nombre: 'Frutas Frescas', precio: 5.00 },
    { id: 3, nombre: 'Crema de Mantequilla', precio: 4.00 },
    { id: 4, nombre: 'Almendras Laminadas', precio: 6.00 },
    { id: 5, nombre: 'Manjar Blanco', precio: 3.50 },
    { id: 6, nombre: 'Ganache de Chocolate', precio: 5.50 }
  ];

  categoriaSeleccionada: string = 'BOCADITO';
  extraSeleccionado: number | null = null;
  cantidad: number = 1;
  precioUnitario: number = 22.00;
  precioTotal: number = 22.00;
  usuarioLogueado: boolean = true; // Deberías verificar esto desde un servicio

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Aquí deberías cargar los datos del postre desde la API
    // const id = this.route.snapshot.paramMap.get('id');
    // this.cargarPostre(id);
    
    this.precioUnitario = this.postre.precio;
    this.categoriaSeleccionada = this.postre.categoria;
    this.calcularPrecioTotal();
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
    if (valor >= 1 && valor <= 20) {
      this.cantidad = valor;
      this.calcularPrecioTotal();
    } else if (valor < 1) {
      this.cantidad = 1;
      this.calcularPrecioTotal();
    } else if (valor > 20) {
      this.cantidad = 20;
      this.calcularPrecioTotal();
    }
  }

  calcularPrecioTotal() {
    let precioExtra = 0;
    
    if (this.extraSeleccionado) {
      const extra = this.extras.find(e => e.id === this.extraSeleccionado);
      if (extra) {
        precioExtra = extra.precio;
      }
    }
    
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
    
    // Aquí deberías llamar a tu servicio para guardar en el carrito
    // this.carritoService.agregar(pedido).subscribe(...)
    
    alert('¡Producto agregado al carrito!');
    this.router.navigate(['/catalogo']);
  }

  cancelar() {
    this.router.navigate(['/catalogo']);
  }

}