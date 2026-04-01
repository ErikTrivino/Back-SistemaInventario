import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDetalleFacturaComponent } from './crear-detalle-factura.component';

describe('CrearDetalleFacturaComponent', () => {
  let component: CrearDetalleFacturaComponent;
  let fixture: ComponentFixture<CrearDetalleFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearDetalleFacturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearDetalleFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
