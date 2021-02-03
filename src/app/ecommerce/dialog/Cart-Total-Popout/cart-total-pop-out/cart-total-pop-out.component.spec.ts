import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTotalPopOutComponent } from './cart-total-pop-out.component';

describe('CartTotalPopOutComponent', () => {
  let component: CartTotalPopOutComponent;
  let fixture: ComponentFixture<CartTotalPopOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartTotalPopOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartTotalPopOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
