import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormatValuesService } from '../../services/Format-Values/format-values.service';
import { FavoriteSignalService } from '../../signals/favorite-signal/favorite-signal.service';
import { CartSignalService } from '../../signals/cart-signal/cart-signal.service';
import { CartService } from '../../services/Cart/cart.service';
import { FavoriteService } from '@services/Favorite/favorite.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-coffee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-coffee.component.html',
  styleUrl: './card-coffee.component.scss',
})
export class CardCoffeeComponent implements OnInit {
  @Input() coffee: any = {};
  @Output() toggleFavorite = new EventEmitter();
  isFavoriteCoffee: boolean = false;
  constructor(
    private router: Router,
    protected cartSignal: CartSignalService,
    private cartService: CartService,
    private favoriteService: FavoriteService,
    protected favoriteSignal: FavoriteSignalService,
    protected formatValuesService: FormatValuesService
  ) {}

  async ngOnInit() {
    this.isFavoriteCoffee = await this.favoriteService.checkCoffeeIsFavorited(
      this.coffee.id
    );
  }

  handleNavigateDetailsScreen() {
    this.router.navigate(['details/', this.coffee.id]);
  }

  handleAddCoffeeToCartList() {
    this.cartService.addCoffeeToCart(this.coffee);
  }

  handleFavorite() {
    this.toggleFavorite.emit(true);
  }

  async handleAddCoffeeToFavoriteList() {
    if (this.isFavoriteCoffee) {
      await this.favoriteService.removeFromFavorites(this.coffee.collectionId);
      this.isFavoriteCoffee = false;
    } else {
      this.favoriteService.addToFavorites(this.coffee);
      this.isFavoriteCoffee = await this.favoriteService.checkCoffeeIsFavorited(
        this.coffee.id
      );
    }
  }
}
