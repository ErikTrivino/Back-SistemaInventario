import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDetalleServicioProductoComponent } from './editar-detalle-servicio-producto.component';

describe('EditarDetalleServicioProductoComponent', () => {
  let component: EditarDetalleServicioProductoComponent;
  let fixture: ComponentFixture<EditarDetalleServicioProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarDetalleServicioProductoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarDetalleServicioProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
