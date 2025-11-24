import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonLabel,
  IonItem,
  IonBadge,
  IonButton,
  IonIcon,
  IonSegment,
  IonSegmentButton,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { trash, receiptOutline, alertCircleOutline } from 'ionicons/icons';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

import { Pedido, mapPedido } from 'src/models/pedido.model';
import { PedidoService } from 'src/services/pedido.service';
import { StorageService } from 'src/services/storage';

@Component({
  selector: 'app-verestadopedido',
  templateUrl: './verestadopedido.page.html',
  styleUrls: ['./verestadopedido.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonCard,
    IonLabel,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonBadge,
    IonButton,
    IonIcon,
    IonSegment,
    IonSegmentButton,
    CommonModule,
    HeaderComponent,
    FooterComponent
  ],
})
export class VerestadopedidoPage implements OnInit {

  segmento = 'activos';

  estados: any[] = []; // se llenan desde el backend

  pedidosActivos: Pedido[] = [];
  pedidosCancelados: Pedido[] = [];
  pedidosFinalizados: Pedido[] = [];

  constructor(
    private pedidoService: PedidoService,
    private storage: StorageService
  ) {
    addIcons({ trash, receiptOutline, alertCircleOutline });
  }

  async ngOnInit() {
    await this.cargarEstados();   // primero los estados reales
    await this.cargarPedidos();   // luego los pedidos
  }

  // ● Cargar estados del backend
  async cargarEstados() {
    return new Promise<void>((resolve) => {
      this.pedidoService.obtenerEstados().subscribe({
        next: (data) => {
          this.estados = data;
          resolve();
        },
        error: (err) => {
          console.error("Error cargando estados", err);
          resolve();
        }
      });
    });
  }

  // ● Cargar pedidos del cliente
  async cargarPedidos() {
    const cliente = await this.storage.get('cliente');

    if (!cliente || !cliente.id_cliente) {
      console.error('❌ No se encontró el cliente en storage');
      return;
    }

    this.pedidoService.obtenerPedidos(cliente.id_cliente).subscribe({
      next: (data) => {
        const pedidos = data.map(mapPedido);

        this.pedidosActivos      = pedidos.filter(p => p.id_estadopedido >= 1 && p.id_estadopedido <= 5);
        this.pedidosFinalizados  = pedidos.filter(p => p.id_estadopedido === 6);
        this.pedidosCancelados   = pedidos.filter(p => p.id_estadopedido >= 7);
      },
      error: (err) => console.error('Error al obtener pedidos', err)
    });
  }

  cambiarSegmento(event: any) {
    this.segmento = event.detail.value;
  }

  // ● Devuelve color dinámico según estado
  obtenerColor(estadoActual: number, idPaso: number): string {
    if (estadoActual >= 7) return 'danger';       
    if (estadoActual === 6) return 'success';     
    return idPaso <= estadoActual ? 'primary' : 'medium';
  }

  async cancelarPedido(pedido: Pedido) {

  const confirmar = confirm("¿Seguro que deseas cancelar este pedido?");
  if (!confirmar) return;

  // Solo permitir cancelar si está en 2, 3, 4
  if (![2,3,4].includes(pedido.id_estadopedido)) {
    await this.mostrarAlerta("No permitido", "Este pedido ya no puede ser cancelado.");
    return;
  }

  // Nuevo estado (sumar 5)
  const nuevoEstadoId = pedido.id_estadopedido + 5;

  // Buscar nombre del nuevo estado
  const estadoNuevo = this.estados.find(e => e.id_estadopedido === nuevoEstadoId);

  if (!estadoNuevo) {
    console.error("❌ No se encontró el nombre del estado", nuevoEstadoId);
    return;
  }

  const body = {
    estado_nombre: estadoNuevo.nombre_estado
  };

  this.pedidoService.cancelarPedido(pedido.id_pedido, body).subscribe({
    next: async () => {
      await this.mostrarAlerta('Éxito', 'El pedido fue cancelado correctamente.');
      await this.cargarPedidos();
    },
    error: async (err) => {
      console.error(err);
      await this.mostrarAlerta('Error', 'No se pudo cancelar el pedido.');
    }
  });
}
  async mostrarAlerta(header: string, message: string) {
    const alert = document.createElement('ion-alert');
    alert.header = header;
    alert.message = message;
    alert.buttons = ['OK'];

    document.body.appendChild(alert);
    await alert.present();
  }

  verRecibo(id: number) {
    alert(`Mostrando recibo del pedido ${id}`);
  }

  reclamarPedido(id: number) {
    alert(`Reclamando pedido ${id}`);
  }

  // ● Estados dinámicos REALES del backend
  get estadosActivos() {
    return this.estados.filter(e => e.id_estadopedido >= 1 && e.id_estadopedido <= 6);
  }

  getEstadoCancelado(pedido: Pedido) {
  return this.estados.find(e => e.id_estadopedido === pedido.id_estadopedido);
}

  debeMostrarCancelar(pedido: Pedido): boolean {
  // Estados que permiten cancelación: 2, 3, 4
  return pedido.id_estadopedido === 2 ||
         pedido.id_estadopedido === 3 ||
         pedido.id_estadopedido === 4;
}
}
