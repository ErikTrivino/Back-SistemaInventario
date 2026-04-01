import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDetallePedidoComponent } from './editar-detalle-pedido.component';

describe('EditarDetallePedidoComponent', () => {
  let component: EditarDetallePedidoComponent;
  let fixture: ComponentFixture<EditarDetallePedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarDetallePedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarDetallePedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
