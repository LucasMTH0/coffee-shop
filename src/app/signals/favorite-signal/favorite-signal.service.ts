import { Injectable, signal } from '@angular/core';
import { coffee } from '../../types/Coffee';

@Injectable({
  providedIn: 'root',
})
export class FavoriteSignalService {
  private favoriteSignal = signal<coffee[]>([]);

  getFavorites() {
    const favoritesList = this.favoriteSignal.asReadonly();
    return favoritesList();
  }
  checkCoffeeIsFavoriteItem(favoriteSelected: coffee) {
    const favoriteList = this.getFavorites();
    const findCoffeeInFavoriteList = favoriteList.findIndex(
      (favoriteItemList: any) =>
        favoriteItemList.coffeeId === favoriteSelected.id
    );
    if (findCoffeeInFavoriteList !== -1) {
      return true;
    }
    return false;
  }
  setFavorites(favorites: any) {
    this.favoriteSignal.set(favorites);
  }
  updateFavorites(newItem: coffee) {
    this.favoriteSignal.update((currentFavorites: coffee[]) => [
      ...currentFavorites,
      newItem,
    ]);
  }
}
