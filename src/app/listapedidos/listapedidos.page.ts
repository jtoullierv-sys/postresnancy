import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, AlertController, ToastController } from '@ionic/angular';
import { HeaderComponent } from '../header/header.component';
import { FooteradminComponent } from '../footeradmin/footeradmin.component';

interface Pedido {
  id: number;
  cliente: string;
  fechaEntrega: string;
  horaEntrega: string;
  estado: string;
  totalPagar: number;
  totalDevuelto: number;
  ganancia: number;
}

@Component({
  selector: 'app-listapedidos',
  templateUrl: './listapedidos.page.html',
  styleUrls: ['./listapedidos.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeaderComponent,
    FooteradminComponent
  ]
})
export class ListapedidosPage implements OnInit {
  pedidos: Pedido[] = [
    {
      id: 1,
      cliente: 'a',
      fechaEntrega: '2025-10-14',
      horaEntrega: '19:20',
      estado: 'Validar Pago',
      totalPagar: 44.00,
      totalDevuelto: 0.00,
      ganancia: 44.00
    },
    {
      id: 2,
      cliente: 'Paco',
      fechaEntrega: '2025-11-19',
      horaEntrega: '22:48',
      estado: 'En Lista',
      totalPagar: 22.00,
      totalDevuelto: 0.00,
      ganancia: 22.00
    }
  ];

  estadosDisponibles = [
    'Validar Pago',
    'En Lista',
    'En preparación',
    'Alistando',
    'Enviado',
    'Entregado',
    'Cancelado en lista',
    'Cancelado En preparación',
    'Cancelado en Alistando'
  ];

  pedidosFiltrados: Pedido[] = [];
  filtroEstado: string = 'todos';
  searchTerm: string = '';

  constructor(
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.pedidosFiltrados = [...this.pedidos];
  }

  filtrarPedidos() {
    this.pedidosFiltrados = this.pedidos.filter(pedido => {
      const coincideEstado = this.filtroEstado === 'todos' || pedido.estado === this.filtroEstado;
      const coincideBusqueda = pedido.cliente.toLowerCase().includes(this.searchTerm.toLowerCase());
      return coincideEstado && coincideBusqueda;
    });
  }

  async cambiarEstado(pedido: Pedido) {
    const alert = await this.alertController.create({
      header: 'Cambiar Estado',
      subHeader: `Pedido #${pedido.id} - ${pedido.cliente}`,
      inputs: this.estadosDisponibles.map(estado => ({
        type: 'radio' as const,
        label: estado,
        value: estado,
        checked: estado === pedido.estado
      })),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Actualizar',
          handler: (nuevoEstado) => {
            if (nuevoEstado) {
              pedido.estado = nuevoEstado;
              this.mostrarToast('Estado actualizado correctamente');
              this.filtrarPedidos();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async verDetalle(pedido: Pedido) {
    const alert = await this.alertController.create({
      header: 'Detalle del Pedido',
      message: `
        <strong>Cliente:</strong> ${pedido.cliente}<br>
        <strong>Fecha:</strong> ${this.formatearFecha(pedido.fechaEntrega)}<br>
        <strong>Hora:</strong> ${pedido.horaEntrega}<br>
        <strong>Estado:</strong> ${pedido.estado}<br>
        <strong>Total a Pagar:</strong> S/ ${pedido.totalPagar.toFixed(2)}<br>
        <strong>Ganancia:</strong> S/ ${pedido.ganancia.toFixed(2)}
      `,
      buttons: ['Cerrar']
    });

    await alert.present();
  }

  actualizarPedido(pedido: Pedido) {
    // Aquí irían las llamadas al servicio/API
    this.mostrarToast('Pedido actualizado');
  }

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom',
      color: 'success'
    });
    toast.present();
  }

  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-ES', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    });
  }

  getEstadoColor(estado: string): string {
    const colores: {[key: string]: string} = {
      'Validar Pago': 'warning',
      'En Lista': 'primary',
      'En preparación': 'secondary',
      'Alistando': 'tertiary',
      'Enviado': 'medium',
      'Entregado': 'success',
      'Cancelado en lista': 'danger',
      'Cancelado En preparación': 'danger',
      'Cancelado en Alistando': 'danger'
    };
    return colores[estado] || 'medium';
  }

  getEstadoIcon(estado: string): string {
    const iconos: {[key: string]: string} = {
      'Validar Pago': 'cash',
      'En Lista': 'list',
      'En preparación': 'restaurant',
      'Alistando': 'checkmark-circle',
      'Enviado': 'bicycle',
      'Entregado': 'checkmark-done',
      'Cancelado en lista': 'close-circle',
      'Cancelado En preparación': 'close-circle',
      'Cancelado en Alistando': 'close-circle'
    };
    return iconos[estado] || 'ellipse';
  }

  calcularGananciaTotal(): number {
    return this.pedidos.reduce((acc, p) => acc + p.ganancia, 0);
  }
}