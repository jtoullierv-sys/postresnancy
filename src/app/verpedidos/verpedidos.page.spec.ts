import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerpedidosPage } from './verpedidos.page';

describe('VerpedidosPage', () => {
  let component: VerpedidosPage;
  let fixture: ComponentFixture<VerpedidosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerpedidosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
