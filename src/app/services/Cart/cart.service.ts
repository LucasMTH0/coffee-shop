import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { coffee } from '../../types/Coffee';
import { AuthService } from '../auth/auth.service';
import {
  Firestore,
  getDocs,
  addDoc,
  collection,
  query,
  deleteDoc,
  doc,
  collectionData,
  where,
} from '@angular/fire/firestore';
import { inject, Injectable, OnInit } from '@angular/core';
import { CartSignalService } from '../../signals/cart-signal/cart-signal.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _collection: any;
  constructor(
    private cartSignal: CartSignalService,
    private authService: AuthService,
    private toastr: ToastrService,
    private firestore: Firestore,
    private router: Router
  ) {
    this._collection = collection(this.firestore, 'cart');
  }

  async getCartCoffees() {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.router.navigate(['/auth/login']);
    }
    const collectionCart = collection(this.firestore, 'cart');
    const coffeesList = (await getDocs(query(collectionCart))).docs.map(
      (coffees) => coffees.data()
    );
    const userCartCoffee = coffeesList.filter(
      (coffeeList: any) => coffeeList.userId === userId
    );
    return userCartCoffee;
    // this.cartSignal.setCartSignal(userCartCoffee)
  }

  getCartCoffeesFromDB() {
    const collectionCart = collection(this.firestore, 'cart');
    return collectionData(collectionCart, { idField: 'id' });
  }

  async addCoffeeToCart(coffee: coffee) {
    const userId = this.authService.getUserId();
    if (!userId) {
      this.router.navigate(['/auth/login']);
    } else {
      try {
        const cartItem = { userId: userId, coffeeId: coffee.id };
        console.log('coffee to add: ', cartItem);
        await addDoc(collection(this.firestore, 'cart'), cartItem);
        this.cartSignal.addCoffeeToCartSignal(coffee);
        this.toastr.success('Café adicionado ao carrinho!');
      } catch (err) {
        console.log(err);
      }
    }
  }

  clearCartList(cartList: any) {
    cartList.map((cartItem: any) => {
      this.removeCoffeeToCart(cartItem.id);
    });
  }

  async submitCoffeeCart(cartList: any) {
    const userId = this.authService.getUserId();
    const currentDateTime = new Date();
    const buyInformation = {
      userId: userId,
      cart: cartList,
      createdAt: currentDateTime,
    };
    try {
      await addDoc(collection(this.firestore, 'buy-historic'), buyInformation);
      this.clearCartList(cartList);
    } catch (err) {
      console.log(err);
    }
  }

  removeCoffeeToCart(coffeeId: string) {
    const coffeeCartReference = doc(this.firestore, `cart/${coffeeId}`);
    return deleteDoc(coffeeCartReference);
  }
}
