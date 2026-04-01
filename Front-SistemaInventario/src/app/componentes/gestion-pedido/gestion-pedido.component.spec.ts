import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPedidoComponent } from './gestion-pedido.component';

describe('GestionPedidoComponent', () => {
  let component: GestionPedidoComponent;
  let fixture: ComponentFixture<GestionPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
