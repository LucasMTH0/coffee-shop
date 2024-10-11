import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtotalCartComponent } from './subtotal-cart.component';

describe('SubtotalCartComponent', () => {
  let component: SubtotalCartComponent;
  let fixture: ComponentFixture<SubtotalCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubtotalCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubtotalCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
