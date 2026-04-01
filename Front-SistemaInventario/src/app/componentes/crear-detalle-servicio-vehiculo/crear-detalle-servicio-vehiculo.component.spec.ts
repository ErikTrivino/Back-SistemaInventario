import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDetalleServicioVehiculoComponent } from './crear-detalle-servicio-vehiculo.component';

describe('CrearDetalleServicioVehiculoComponent', () => {
  let component: CrearDetalleServicioVehiculoComponent;
  let fixture: ComponentFixture<CrearDetalleServicioVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearDetalleServicioVehiculoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearDetalleServicioVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
