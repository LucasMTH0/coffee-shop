import { FavoriteSignalService } from '@signals/favorite-signal/favorite-signal.service';
import { CoffeeService } from '@services/Coffee/coffee.service';
import { AuthService } from '@services/auth/auth.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDocs,
  query,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(
    private favoriteSignal: FavoriteSignalService,
    private coffeeService: CoffeeService,
    private authService: AuthService,
    private toastr: ToastrService,
    private firestore: Firestore,
    private router: Router
  ) {}

  async getFavoritesCoffees() {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.router.navigate(['/auth/login']);
    }

    const coffeesListDB = await getDocs(
      query(collection(this.firestore, 'favorite'))
    );
    const coffeesFilteredByUser = coffeesListDB.docs
      .filter((coffee: any) => {
        if (coffee.data().userId === userId) {
          return { ...coffee.data(), id: coffee.id };
        }
      })
      .map((coffee) => {
        return { ...coffee.data(), id: coffee.id };
      });

    // ).docs
    // const coffeesList = (
    //   await getDocs(query(collection(this.firestore, 'favorite')))
    // ).docs.map((coffees) => coffees.data());

    // const userCartCoffee = coffeesList.filter(
    //   (coffeeList: any) => coffeeList.userId === userId
    // );

    this.favoriteSignal.setFavorites(coffeesFilteredByUser);
    return coffeesFilteredByUser;
  }

  removeFavoriteCoffee(coffeeId: string) {
    const coffeeCartReference = doc(this.firestore, `favorite/${coffeeId}`);
    return deleteDoc(coffeeCartReference);
  }

  async checkCoffeeIsFavorited(coffeeId: string) {
    const coffeeList = await this.getFavoritesCoffees();
    const coffeeFilteredById: any = coffeeList.filter(
      (coffee: any) => coffee.coffeeId == coffeeId
    );
    return coffeeFilteredById.length > 0 ? coffeeFilteredById[0].id : null;
  }

  removeFromFavorites(id: string) {
    const coffeeCartReference = doc(this.firestore, `favorite/${id}`);
    return deleteDoc(coffeeCartReference);
  }

  async addToFavorites(coffee: any) {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.router.navigate(['/auth/login']);
    } else {
      try {
        const cartItem = { userId: userId, coffeeId: coffee.id };
        await addDoc(collection(this.firestore, 'favorite'), cartItem);
        this.toastr.success('Café adicionado aos favoritos!');
        this.favoriteSignal.updateFavorites(coffee);
      } catch (err) {
        console.log(err);
      }
    }
  }
}
