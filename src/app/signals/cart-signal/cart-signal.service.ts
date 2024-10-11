import { Injectable, signal } from '@angular/core';
import { coffee } from '../../types/Coffee';

@Injectable({
  providedIn: 'root'
})
export class CartSignalService {
  private cartSignal = signal<coffee[]>([]);
  constructor() { }

  getCart() {
    const cartList = this.cartSignal.asReadonly();
    return cartList();
  }

  setCartSignal(cart: any) {
    this.cartSignal.set(cart)
  }



  addCoffeeToCartSignal(newItem: coffee) {
    this.cartSignal.update((currentCart: coffee[]) => [...currentCart, newItem])
  }
}
