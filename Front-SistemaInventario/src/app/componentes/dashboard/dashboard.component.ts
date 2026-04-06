import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableroService } from '../../servicios/tablero.service';
import { AuditoriaService } from '../../servicios/auditoria.service';
import { ReporteService } from '../../servicios/reporte.service';
import { TokenService } from '../../servicios/token.service';

import { MensajeDTO } from '../../modelo/mensaje-dto';
import { AlertaStockDTO } from '../../modelo/informacionObjeto';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexYAxis,
  ApexLegend,
  NgApexchartsModule,
  ApexPlotOptions,
  ApexFill,
  ApexTooltip
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  colors: string[];
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;

  resumen: any = {
    ingresoHoy: 0,
    ventasHoy: 0,
    productosAgotados: 0,
    productosEnStockMinimo: 0,
    ordenesPendientesRecepcion: 0,
    transferenciasPendientes: 0,
    transferenciasEnTransito: 0,
    totalProductos: 0
  };

  actividades: any[] = [];
  alertasStock: AlertaStockDTO[] = [];
  topProductos: any[] = [];

  // Configuración de gráficos
  chartVentas: Partial<ChartOptions> = {};
  chartProductos: Partial<ChartOptions> = {};
  chartMovimientos: any = {}; // Usamos any para simplificar con donut (number[])

  constructor(
    private tableroService: TableroService,
    private auditoriaService: AuditoriaService,
    private reporteService: ReporteService,
    private tokenService: TokenService
  ) { }


  ngOnInit(): void {
    this.initCharts();
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargarResumen();
    this.cargarActividadReciente();
    this.cargarAlertasStock();
    this.cargarDatosGraficos();
  }

  cargarResumen(): void {
    this.tableroService.getResumenDiario().subscribe({
      next: (data: MensajeDTO) => {
        if (!data.error && data.respuesta) {
          this.resumen = data.respuesta;

        }
      }
    });
  }

  cargarActividadReciente(): void {
    this.auditoriaService.getAuditLogs(0, 8).subscribe({
      next: (data: MensajeDTO) => {
        if (!data.error && data.respuesta) {
          // Si la respuesta es una página, tomamos el contenido
          this.actividades = data.respuesta.content || data.respuesta;

        }
      }
    });
  }

  cargarAlertasStock(): void {
    this.tableroService.getAlertasStock(0, 5).subscribe({
      next: (data: MensajeDTO) => {
        if (!data.error && data.respuesta) {
          // Si la respuesta es una página (con content) o un array directamente
          const content = (data.respuesta.content || data.respuesta) as AlertaStockDTO[];
          this.alertasStock = content;

          // Actualizamos el resumen con el conteo total de alertas
          this.resumen.productosEnStockMinimo = data.respuesta.totalElements || content.length || 0;

        }
      }
    });
  }

  cargarDatosGraficos(): void {
    const hoy = new Date();
    const hace7dias = new Date();
    hace7dias.setDate(hoy.getDate() - 7);

    const inicio = hace7dias.toISOString().split('T')[0];
    const fin = hoy.toISOString().split('T')[0];

    // Ventas última semana
    this.reporteService.generarReporteVentas(inicio, fin).subscribe({
      next: (data: MensajeDTO) => {
        if (!data.error && data.respuesta) {
          this.actualizarGraficoVentas(data.respuesta);
        }
      }
    });

    // Productos más vendidos (Top 5 del mes actual)
    const mesActual = hoy.getMonth() + 1;
    const anioActual = hoy.getFullYear();
    this.reporteService.generarAnalisisRotacion(mesActual, anioActual, 0, 5).subscribe({
      next: (data: MensajeDTO) => {
        if (!data.error && data.respuesta) {
          // El objeto respuesta contiene { anio, mes, productos: { content: [...] } }
          const lista = data.respuesta.productos?.content || data.respuesta.content || data.respuesta;
          this.actualizarGraficoProductos(lista);
        }
      }
    });

    // Movimientos de inventario (Ejemplo con datos de transferencia)
    this.tableroService.getMetricasTransferencias().subscribe({
      next: (data: MensajeDTO) => {
        if (!data.error && data.respuesta) {
          this.actualizarGraficoMovimientos(data.respuesta);
        }
      }
    });
  }

  private initCharts(): void {
    // Inicializar con esqueletos o datos vacíos
    this.chartVentas = {
      series: [{ name: "Ventas", data: [0, 0, 0, 0, 0, 0, 0] }],
      chart: { height: 350, type: "area", toolbar: { show: false }, zoom: { enabled: false } },
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 3 },
      xaxis: { categories: ["Lun", "Mar", "Mie", "Jue", "Vie", "Sab", "Dom"] },
      colors: ["#3b82f6"], // Blue 500
      fill: { type: "gradient", gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3, stops: [0, 90, 100] } }
    };

    this.chartProductos = {
      series: [{ name: "Ventas", data: [0, 0, 0, 0, 0] }],
      chart: { height: 250, type: "bar", toolbar: { show: false } },
      plotOptions: { bar: { borderRadius: 4, horizontal: true } },
      dataLabels: { enabled: true },
      xaxis: { categories: ["P1", "P2", "P3", "P4", "P5"] },
      colors: ["#10b981"] // Emerald 500
    };

    this.chartMovimientos = {
      series: [44, 55, 13, 33],
      chart: { height: 350, type: "donut" },
      labels: ["Completadas", "Pendientes", "En Tránsito", "Discrepancias"],
      colors: ["#10b981", "#f59e0b", "#3b82f6", "#ef4444"],
      legend: { position: "bottom" }
    };
  }

  private actualizarGraficoVentas(data: any): void {
    // Aquí procesaríamos los datos reales para el gráfico de líneas
    // Por ahora simulamos con base en totalVentas si no viene el desglose
    this.chartVentas.series = [{
      name: "Ventas ($)",
      data: [31, 40, 28, 51, 42, 109, 100] // Ejemplo, en prod usar data real
    }];
  }

  private actualizarGraficoProductos(productos: any[]): void {
    if (productos && Array.isArray(productos) && productos.length > 0) {
      this.topProductos = productos;
      this.chartProductos.series = [{
        name: "Unidades",
        data: productos.map(p => p.totalSalidas)
      }];
      this.chartProductos.xaxis = {
        categories: productos.map(p => p.nombreProducto)
      };
    } else {
      this.topProductos = [];
    }
  }

  getBadgeClass(clasificacion: string): string {
    switch (clasificacion?.toUpperCase()) {
      case 'A': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'B': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'C': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  }

  private actualizarGraficoMovimientos(metricas: any): void {
    if (metricas) {
      this.chartMovimientos.series = [
        metricas.completadas || 0,
        metricas.pendientes || 0,
        metricas.enTransito || 0,
        metricas.conDiscrepancias || 0
      ];
    }
  }

  getIconForActivity(accion: string): string {
    switch (accion?.toUpperCase()) {
      case 'CREATE': return 'fa-plus-circle text-green-500';
      case 'UPDATE': return 'fa-edit text-blue-500';
      case 'DELETE': return 'fa-trash-alt text-red-500';
      case 'LOGIN': return 'fa-sign-in-alt text-purple-500';
      case 'LOGOUT': return 'fa-sign-out-alt text-gray-500';
      default: return 'fa-history text-indigo-500';
    }
  }

  public isOperador(): boolean {
    return this.tokenService.getRol() === 'OPERADOR';
  }
}
