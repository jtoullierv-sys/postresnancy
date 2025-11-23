import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { 
  people, 
  time, 
  iceCream, 
  sparkles,
  trendingUp,
  analytics,
  trophy,
  medal,
  downloadOutline,
  statsChart,
  remove
} from 'ionicons/icons';

import { FooteradminComponent } from '../footeradmin/footeradmin.component';
import { HeaderComponent } from '../header/header.component';

// Instala: npm install chart.js
// import { Chart, registerables } from 'chart.js';
// Chart.register(...registerables);

// Instala: npm install jspdf
// import jsPDF from 'jspdf';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    IonContent, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonCard, 
    IonCardContent, 
    IonCardHeader, 
    IonCardTitle,
    IonButton,
    IonIcon,
    FooteradminComponent,
    HeaderComponent
  ],
})
export class EstadisticasPage implements OnInit, AfterViewInit {
  
  @ViewChild('ingresoChart') ingresoChart!: ElementRef;
  @ViewChild('pedidosChart') pedidosChart!: ElementRef;
  @ViewChild('postresChart') postresChart!: ElementRef;
  @ViewChild('clientesChart') clientesChart!: ElementRef;

  // Datos de las tarjetas
  numCliente: number = 0;
  numPedidoPorValidar: number = 0;
  numPostresCatalogo: number = 0;
  numPostresPersonalizados: number = 0;

  // Instancias de gráficos
  private chartIngreso: any;
  private chartPedidos: any;
  private chartPostres: any;
  private chartClientes: any;

  constructor() {
    addIcons({
      people,
      time,
      iceCream,
      sparkles,
      trendingUp,
      analytics,
      trophy,
      medal,
      downloadOutline,
      statsChart,
      remove
    });
  }

  ngOnInit() {
    this.loadMockData();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.crearGraficoIngresos();
      this.crearGraficoPedidos();
      this.crearGraficoTopPostres();
      this.crearGraficoTopClientes();
    }, 300);
  }

  loadMockData(): void {
    this.numCliente = 150;
    this.numPedidoPorValidar = 7;
    this.numPostresCatalogo = 45;
    this.numPostresPersonalizados = 22;
  }

  // ============================================
  // GRÁFICOS CON CHART.JS
  // ============================================

  crearGraficoIngresos(): void {
    // DESCOMENTA CUANDO INSTALES CHART.JS
    /*
    const ctx = this.ingresoChart.nativeElement.getContext('2d');
    
    this.chartIngreso = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct'],
        datasets: [{
          label: 'Ingresos (S/.)',
          data: [5000, 9500, 15200, 22100, 28900, 34500, 39800, 43200, 45800, 48200],
          borderColor: '#ff6b6b',
          backgroundColor: 'rgba(255, 107, 107, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#ff6b6b',
          pointBorderWidth: 3,
          pointHoverBackgroundColor: '#ff6b6b',
          pointHoverBorderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(31, 41, 55, 0.95)',
            padding: 16,
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 13 },
            borderColor: 'rgba(255, 107, 107, 0.3)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              label: function(context) {
                return 'S/. ' + context.parsed.y.toLocaleString('es-PE');
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.04)',
              drawBorder: false
            },
            ticks: {
              font: { size: 11, weight: '600' },
              color: '#6b7280',
              callback: function(value) {
                return 'S/. ' + (value as number / 1000).toFixed(0) + 'k';
              }
            }
          },
          x: {
            grid: { display: false, drawBorder: false },
            ticks: {
              font: { size: 11, weight: '600' },
              color: '#6b7280'
            }
          }
        }
      }
    });
    */
    console.log('✅ Gráfico de ingresos listo');
  }

  crearGraficoPedidos(): void {
    // DESCOMENTA CUANDO INSTALES CHART.JS
    /*
    const ctx = this.pedidosChart.nativeElement.getContext('2d');
    
    this.chartPedidos = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct'],
        datasets: [{
          label: 'Pedidos',
          data: [12, 25, 40, 58, 73, 89, 102, 115, 125, 132],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
          pointRadius: 6,
          pointHoverRadius: 8,
          pointBackgroundColor: '#fff',
          pointBorderColor: '#10b981',
          pointBorderWidth: 3,
          pointHoverBackgroundColor: '#10b981',
          pointHoverBorderColor: '#fff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(31, 41, 55, 0.95)',
            padding: 16,
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 13 },
            borderColor: 'rgba(16, 185, 129, 0.3)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: { color: 'rgba(0, 0, 0, 0.04)', drawBorder: false },
            ticks: {
              font: { size: 11, weight: '600' },
              color: '#6b7280'
            }
          },
          x: {
            grid: { display: false, drawBorder: false },
            ticks: {
              font: { size: 11, weight: '600' },
              color: '#6b7280'
            }
          }
        }
      }
    });
    */
    console.log('✅ Gráfico de pedidos listo');
  }

  crearGraficoTopPostres(): void {
    // DESCOMENTA CUANDO INSTALES CHART.JS
    /*
    const ctx = this.postresChart.nativeElement.getContext('2d');
    
    this.chartPostres = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Alfajores', 'Torta Chocolate', 'Cheesecake', 'Pie Limón', 'Brownies'],
        datasets: [{
          label: 'Pedidos',
          data: [145, 98, 87, 76, 65],
          backgroundColor: [
            '#f59e0b',
            '#fb923c',
            '#fbbf24',
            '#fcd34d',
            '#fde68a'
          ],
          borderRadius: 10,
          borderWidth: 0
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(31, 41, 55, 0.95)',
            padding: 16,
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 13 },
            cornerRadius: 8,
            displayColors: false
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: { color: 'rgba(0, 0, 0, 0.04)', drawBorder: false },
            ticks: {
              font: { size: 11, weight: '600' },
              color: '#6b7280'
            }
          },
          y: {
            grid: { display: false, drawBorder: false },
            ticks: {
              font: { size: 11, weight: '600' },
              color: '#6b7280'
            }
          }
        }
      }
    });
    */
    console.log('✅ Gráfico de top postres listo');
  }

  crearGraficoTopClientes(): void {
    // DESCOMENTA CUANDO INSTALES CHART.JS
    /*
    const ctx = this.clientesChart.nativeElement.getContext('2d');
    
    this.chartClientes = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['María G.', 'Carlos R.', 'Ana M.', 'José L.', 'Laura P.'],
        datasets: [{
          label: 'Pedidos',
          data: [28, 22, 19, 17, 15],
          backgroundColor: [
            '#8b5cf6',
            '#a78bfa',
            '#c4b5fd',
            '#ddd6fe',
            '#ede9fe'
          ],
          borderRadius: 10,
          borderWidth: 0
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(31, 41, 55, 0.95)',
            padding: 16,
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 13 },
            cornerRadius: 8,
            displayColors: false
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            grid: { color: 'rgba(0, 0, 0, 0.04)', drawBorder: false },
            ticks: {
              font: { size: 11, weight: '600' },
              color: '#6b7280'
            }
          },
          y: {
            grid: { display: false, drawBorder: false },
            ticks: {
              font: { size: 11, weight: '600' },
              color: '#6b7280'
            }
          }
        }
      }
    });
    */
    console.log('✅ Gráfico de top clientes listo');
  }

  // ============================================
  // GENERACIÓN DE PDF
  // ============================================

  generarReportePDF(): void {
    // DESCOMENTA CUANDO INSTALES JSPDF
    /*
    const doc = new jsPDF();
    const fechaActual = new Date().toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // === HEADER ===
    doc.setFillColor(255, 107, 107);
    doc.rect(0, 0, 210, 35, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('Dashboard Analytics', 105, 15, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Postres Nancy Online', 105, 23, { align: 'center' });
    doc.text(`Reporte generado: ${fechaActual}`, 105, 30, { align: 'center' });

    // === ESTADÍSTICAS PRINCIPALES ===
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('📊 Resumen General', 20, 50);

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    
    // Tarjetas de estadísticas
    const stats = [
      { label: 'Total Clientes', value: this.numCliente, color: [59, 130, 246] },
      { label: 'Pedidos por Validar', value: this.numPedidoPorValidar, color: [16, 185, 129] },
      { label: 'Postres en Catálogo', value: this.numPostresCatalogo, color: [245, 158, 11] },
      { label: 'Postres Personalizados', value: this.numPostresPersonalizados, color: [139, 92, 246] }
    ];

    let yPos = 60;
    stats.forEach(stat => {
      doc.setFillColor(stat.color[0], stat.color[1], stat.color[2], 0.1);
      doc.roundedRect(20, yPos, 170, 12, 2, 2, 'F');
      
      doc.setTextColor(31, 41, 55);
      doc.setFont('helvetica', 'bold');
      doc.text(stat.label, 25, yPos + 8);
      
      doc.setTextColor(stat.color[0], stat.color[1], stat.color[2]);
      doc.setFontSize(14);
      doc.text(stat.value.toString(), 180, yPos + 8, { align: 'right' });
      doc.setFontSize(11);
      
      yPos += 18;
    });

    // === INGRESOS ===
    yPos += 10;
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('💰 Ingresos Acumulados', 20, yPos);

    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct'];
    const ingresos = [5000, 9500, 15200, 22100, 28900, 34500, 39800, 43200, 45800, 48200];
    
    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPos, 170, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Mes', 25, yPos + 5);
    doc.text('Acumulado (S/.)', 140, yPos + 5);
    
    yPos += 10;
    doc.setFont('helvetica', 'normal');
    
    for (let i = 0; i < meses.length && yPos < 270; i++) {
      doc.text(meses[i], 25, yPos);
      doc.text('S/. ' + ingresos[i].toLocaleString('es-PE'), 140, yPos);
      yPos += 6;
    }

    // === NUEVA PÁGINA PARA TOP 5 ===
    doc.addPage();
    
    // Header página 2
    doc.setFillColor(255, 107, 107);
    doc.rect(0, 0, 210, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Rankings y Estadísticas', 105, 15, { align: 'center' });

    // === TOP 5 POSTRES ===
    yPos = 40;
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(16);
    doc.text('🏆 Top 5 Postres Solicitados', 20, yPos);

    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const postres = [
      ['Alfajores X12', '145'],
      ['Torta de Chocolate', '98'],
      ['Cheesecake Frutos Rojos', '87'],
      ['Pie de Limón', '76'],
      ['Brownies Premium', '65']
    ];

    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPos, 170, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Producto', 25, yPos + 5);
    doc.text('Pedidos', 160, yPos + 5);
    
    yPos += 10;
    doc.setFont('helvetica', 'normal');
    
    postres.forEach((postre, index) => {
      const bgColor = 245 - (index * 10);
      doc.setFillColor(bgColor, 158, 11, 0.2);
      doc.rect(20, yPos - 3, 170, 7, 'F');
      
      doc.text((index + 1) + '. ' + postre[0], 25, yPos + 2);
      doc.text(postre[1], 160, yPos + 2);
      yPos += 9;
    });

    // === TOP 5 CLIENTES ===
    yPos += 15;
    doc.setTextColor(31, 41, 55);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('👥 Top 5 Clientes Frecuentes', 20, yPos);

    yPos += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    
    const clientes = [
      ['María González', '28'],
      ['Carlos Rodríguez', '22'],
      ['Ana María Torres', '19'],
      ['José Luis Pérez', '17'],
      ['Laura Patricia Silva', '15']
    ];

    doc.setFillColor(240, 240, 240);
    doc.rect(20, yPos, 170, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.text('Cliente', 25, yPos + 5);
    doc.text('Pedidos', 160, yPos + 5);
    
    yPos += 10;
    doc.setFont('helvetica', 'normal');
    
    clientes.forEach((cliente, index) => {
      const bgColor = 235 - (index * 10);
      doc.setFillColor(139, 92, 246, 0.2);
      doc.rect(20, yPos - 3, 170, 7, 'F');
      
      doc.text((index + 1) + '. ' + cliente[0], 25, yPos + 2);
      doc.text(cliente[1], 160, yPos + 2);
      yPos += 9;
    });

    // === FOOTER ===
    doc.setFontSize(8);
    doc.setTextColor(107, 114, 128);
    doc.text('Documento generado automáticamente | Postres Nancy Online © 2025', 105, 285, { align: 'center' });

    // === DESCARGAR ===
    const timestamp = new Date().getTime();
    doc.save(`Reporte_Dashboard_${timestamp}.pdf`);

    console.log('✅ PDF generado exitosamente');
    */

    // Versión sin jsPDF
    alert('📄 Función PDF lista!\n\nPara activarla:\n1. Instala: npm install jspdf\n2. Descomenta el código en generarReportePDF()');
    console.log('📊 Datos listos para exportar:', {
      clientes: this.numCliente,
      pedidos: this.numPedidoPorValidar,
      catalogo: this.numPostresCatalogo,
      personalizados: this.numPostresPersonalizados
    });
  }

  ngOnDestroy() {
    if (this.chartIngreso) this.chartIngreso.destroy();
    if (this.chartPedidos) this.chartPedidos.destroy();
    if (this.chartPostres) this.chartPostres.destroy();
    if (this.chartClientes) this.chartClientes.destroy();
  }
}