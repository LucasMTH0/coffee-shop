import { ListCoffeesComponent } from '@components/list-coffees/list-coffees.component';
import { CardCoffeeComponent } from '@components/card-coffee/card-coffee.component';
import { Component, DestroyRef, effect, inject, OnInit } from '@angular/core';
import { CoffeeService } from '@services/Coffee/coffee.service';
import { FavoriteService } from '@services/Favorite/favorite.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadingService } from '@services/Loading/loading.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-favorites',
  styleUrl: './favorites.component.scss',
  templateUrl: './favorites.component.html',
  imports: [
    CardCoffeeComponent,
    ListCoffeesComponent,
    LoadingComponent,
    AsyncPipe,
  ],
})
export class FavoritesComponent implements OnInit {
  protected favoritesCoffeeList: any = [];
  destroyRef = inject(DestroyRef);

  constructor(
    private favoritesService: FavoriteService,
    protected loadingService: LoadingService,
    private coffeeService: CoffeeService
  ) {}

  getCoffeeById(id: number, collectionId: string) {
    this.coffeeService
      .getSingleCoffee(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((coffee: any) => {
        coffee[0].collectionId = collectionId;
        this.favoritesCoffeeList.push(coffee[0]);
      });
  }

  async getCartList() {
    this.loadingService.loadingOn();
    const favoriteList = await this.favoritesService.getFavoritesCoffees();
    favoriteList.forEach((coffeeCart: any) => {
      this.getCoffeeById(coffeeCart.coffeeId, coffeeCart.id);
    });
    this.loadingService.loadingOff();
  }

  ngOnInit(): void {
    this.getCartList();
  }
}
