import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDetalleServicioProductoComponent } from './crear-detalle-servicio-producto.component';

describe('CrearDetalleServicioProductoComponent', () => {
  let component: CrearDetalleServicioProductoComponent;
  let fixture: ComponentFixture<CrearDetalleServicioProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearDetalleServicioProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearDetalleServicioProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
