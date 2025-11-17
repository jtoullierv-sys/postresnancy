import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle, 
  IonButtons, 
  IonBackButton 
} from '@ionic/angular/standalone'; 
import { FooteradminComponent } from '../footeradmin/footeradmin.component';
import { HeaderComponent } from '../header/header.component';// Asegúrate de ajustar esta ruta

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCardTitle, 
    IonButtons, 
    IonBackButton,
    FooteradminComponent,
    HeaderComponent // Importamos tu componente de header
  ],
})
export class EstadisticasPage implements OnInit {
  // Propiedades para los contadores
  numCliente: number = 0;
  numPedidoPorValidar: number = 0;
  numPostresCatalogo: number = 0;
  numPostresPersonalizados: number = 0;

  constructor() { }

  ngOnInit() {
    this.loadMockData();
  }

  /**
   * Carga datos de prueba.
   */
  loadMockData(): void {
    const mockData = {
        numCliente: 150,
        numPedidoPorValidar: 7,
        numPostresCatalogo: 45,
        numPostresPersonalizados: 22
    };

    this.numCliente = mockData.numCliente;
    this.numPedidoPorValidar = mockData.numPedidoPorValidar;
    this.numPostresCatalogo = mockData.numPostresCatalogo;
    this.numPostresPersonalizados = mockData.numPostresPersonalizados;
  }
}

// --- Componentes del Footer ---
// Necesitas crear el componente FooteradminComponent en una ruta separada 
// (ej: src/app/components/footer-admin/footer-admin.component.ts)
// El contenido completo de este componente se proporciona en los siguientes archivos.