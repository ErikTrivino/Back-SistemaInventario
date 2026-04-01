import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDetalleServicioVehiculoComponent } from './editar-detalle-servicio-vehiculo.component';

describe('EditarDetalleServicioVehiculoComponent', () => {
  let component: EditarDetalleServicioVehiculoComponent;
  let fixture: ComponentFixture<EditarDetalleServicioVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarDetalleServicioVehiculoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarDetalleServicioVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
