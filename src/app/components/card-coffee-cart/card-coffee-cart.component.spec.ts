import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCoffeeCartComponent } from './card-coffee-cart.component';

describe('CardCoffeeCartComponent', () => {
  let component: CardCoffeeCartComponent;
  let fixture: ComponentFixture<CardCoffeeCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCoffeeCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCoffeeCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
