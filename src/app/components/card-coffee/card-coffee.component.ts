import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormatValuesService } from '../../services/Format-Values/format-values.service';
import { FavoriteSignalService } from '../../signals/favorite-signal/favorite-signal.service';
import { CartSignalService } from '../../signals/cart-signal/cart-signal.service';
import { CartService } from '../../services/Cart/cart.service';
import { FavoriteService } from '@services/Favorite/favorite.service';
import { CommonModule } from '@angular/common';
import { UserSignalService } from '@signals/user-signal/user-signal.service';

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
  userLogged: any = ''
  constructor(
    protected formatValuesService: FormatValuesService,
    protected favoriteSignal: FavoriteSignalService,
    private favoriteService: FavoriteService,
    protected cartSignal: CartSignalService,
    private userSignal: UserSignalService,
    private cartService: CartService,
    private router: Router,
  ) {}

  async ngOnInit() {
    this.userLogged = this.userSignal.getUserSignal();
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
    if(!this.userLogged){
      this.router.navigate(['/login'])
    } else {
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
}
