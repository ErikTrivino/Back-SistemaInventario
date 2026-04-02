import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paginador.component.html'
})
export class PaginadorComponent {
  @Input() totalElementos = 0;
  @Input() totalPaginas = 0;
  @Input() paginaActual = 0; // 0-indexed en lógica, 1-indexed para el usuario
  @Input() tamanoPagina = 10;
  
  @Output() cambioPagina = new EventEmitter<number>();
  @Output() cambioTamano = new EventEmitter<number>();

  protected Math = Math;

  get listadoPaginas(): number[] {
    const list: number[] = [];
    if (this.totalPaginas <= 7) {
      for (let i = 0; i < this.totalPaginas; i++) list.push(i);
    } else {
      list.push(0);
      if (this.paginaActual > 2) list.push(-1); // Separador
      
      const start = Math.max(1, this.paginaActual - 1);
      const end = Math.min(this.totalPaginas - 2, this.paginaActual + 1);
      
      for (let i = start; i <= end; i++) {
        if (!list.includes(i)) list.push(i);
      }
      
      if (this.paginaActual < this.totalPaginas - 3) list.push(-2); // Separador
      if (!list.includes(this.totalPaginas - 1)) list.push(this.totalPaginas - 1);
    }
    return list;
  }

  irAPagina(p: number) {
    if (p >= 0 && p < this.totalPaginas && p !== this.paginaActual) {
      this.cambioPagina.emit(p);
    }
  }

  cambiarTamano(event: any) {
    const nuevoTamano = +event.target.value;
    this.cambioTamano.emit(nuevoTamano);
  }
}
