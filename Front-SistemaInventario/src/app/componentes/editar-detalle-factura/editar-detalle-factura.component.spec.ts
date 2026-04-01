import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDetalleFacturaComponent } from './editar-detalle-factura.component';

describe('EditarDetalleFacturaComponent', () => {
  let component: EditarDetalleFacturaComponent;
  let fixture: ComponentFixture<EditarDetalleFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarDetalleFacturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarDetalleFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
