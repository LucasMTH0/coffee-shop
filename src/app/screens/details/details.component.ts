import { FormatValuesService } from '@services/Format-Values/format-values.service';
import { LoadingComponent } from '@components/loading/loading.component';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FavoriteService } from '@services/Favorite/favorite.service';
import { LoadingService } from '@services/Loading/loading.service';
import { CoffeeService } from '@services/Coffee/coffee.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CartService } from '@services/Cart/cart.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSignalService } from '@signals/user-signal/user-signal.service';

@Component({
  templateUrl: './details.component.html',
  imports: [LoadingComponent, AsyncPipe, CommonModule],
  styleUrl: './details.component.scss',
  selector: 'app-details',
  standalone: true,
})
export class DetailsComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  protected isFavoriteCoffee: any = null;
  destroyRef = inject(DestroyRef);
  protected coffee: any = {};
  userLogged = null
  constructor(
    protected formatService: FormatValuesService,
    private favoriteService: FavoriteService,
    protected loadingService: LoadingService,
    private userSignal: UserSignalService,
    private coffeeService: CoffeeService,
    private cartService: CartService,
    private router: Router
  ) {
    this.userLogged = this.userSignal.getUserSignal();
  }

  ngOnInit(): void {
    this.coffeeService
      .getSingleCoffee(this.activatedRoute.snapshot.paramMap.get('id'))
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(async (coffee: any) => {
        this.coffee = coffee[0];
        this.isFavoriteCoffee =
          await this.favoriteService.checkCoffeeIsFavorited(this.coffee.id);
      });
  }

  async handleToggleFavoriteCoffee() {
    if(!this.userLogged){
      this.router.navigate(['/login'])
    } else {
      this.loadingService.loadingOn();
      if (this.isFavoriteCoffee) {
        await this.favoriteService.removeFromFavorites(this.isFavoriteCoffee);
        this.isFavoriteCoffee = false;
      } else {
        this.favoriteService.addToFavorites(this.coffee);
        this.isFavoriteCoffee = true;
      }
      this.loadingService.loadingOff();
    }
  }

  handleAddCoffeeToCartList() {
    this.cartService.addCoffeeToCart(this.coffee);
  }
}
