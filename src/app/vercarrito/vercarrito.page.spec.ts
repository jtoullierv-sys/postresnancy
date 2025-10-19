import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VercarritoPage } from './vercarrito.page';

describe('VercarritoPage', () => {
  let component: VercarritoPage;
  let fixture: ComponentFixture<VercarritoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VercarritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
