import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDetallePedidoComponent } from './crear-detalle-pedido.component';

describe('CrearDetallePedidoComponent', () => {
  let component: CrearDetallePedidoComponent;
  let fixture: ComponentFixture<CrearDetallePedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearDetallePedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearDetallePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
