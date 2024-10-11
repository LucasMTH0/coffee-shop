import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormatValuesService } from '@services/Format-Values/format-values.service';

@Component({
  selector: 'app-card-coffee-cart',
  standalone: true,
  imports: [],
  templateUrl: './card-coffee-cart.component.html',
  styleUrl: './card-coffee-cart.component.scss',
})
export class CardCoffeeCartComponent {
  @Input() coffee: any = '';
  @Output() removeCoffee = new EventEmitter();
  constructor(protected formatService: FormatValuesService){}
  handleRemoveCoffee() {
    this.removeCoffee.emit(this.coffee.collectionId);
  }
}
