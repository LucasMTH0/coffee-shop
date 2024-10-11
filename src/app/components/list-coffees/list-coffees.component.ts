import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardCoffeeComponent } from '@components/card-coffee/card-coffee.component';

@Component({
  selector: 'app-list-coffees',
  standalone: true,
  imports: [CardCoffeeComponent],
  templateUrl: './list-coffees.component.html',
  styleUrl: './list-coffees.component.scss',
})
export class ListCoffeesComponent {
  @Input() coffeesList: any = [];
  @Output() toggleFavoriteCoffee = new EventEmitter();

  handleFavorite(event: any) {
    this.toggleFavoriteCoffee.emit(true);
  }
}
