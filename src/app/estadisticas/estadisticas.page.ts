import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class EstadisticasPage implements OnInit {
  // Datos de las tarjetas
  numCliente: number = 45;
  numPedidoPorValidar: number = 12;
  numPostresCatalogo: number = 28;
  numPostresPersonalizados: number = 15;

  constructor() {}

  ngOnInit() {
    // Aquí puedes cargar los datos desde tu servicio/API
    this.loadEstadisticas();
  }

  loadEstadisticas() {
    // Ejemplo: cargar desde un servicio
    // this.estadisticasService.getEstadisticas().subscribe(data => {
    //   this.numCliente = data.numCliente;
    //   this.numPedidoPorValidar = data.numPedidoPorValidar;
    //   this.numPostresCatalogo = data.numPostresCatalogo;
    //   this.numPostresPersonalizados = data.numPostresPersonalizados;
    // });
  }
}