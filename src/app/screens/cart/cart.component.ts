import { Component, DestroyRef, effect, inject, OnInit } from '@angular/core';
import { CartSignalService } from '../../signals/cart-signal/cart-signal.service';
import { FormatValuesService } from '../../services/Format-Values/format-values.service';
import { map, Observable, Subscription } from 'rxjs';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from 'firebase/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { CartService } from '@services/Cart/cart.service';
import { CoffeeService } from '@services/Coffee/coffee.service';
import { ToastrService } from 'ngx-toastr';
import { MatIconModule } from '@angular/material/icon';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CardCoffeeCartComponent } from '@components/card-coffee-cart/card-coffee-cart.component';
import { SubtotalCartComponent } from '../../components/subtotal-cart/subtotal-cart.component';
import { LoadingService } from '@services/Loading/loading.service';
import { LoadingComponent } from '../../components/loading/loading.component';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CardCoffeeCartComponent,
    SubtotalCartComponent,
    LoadingComponent,
    AsyncPipe,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  protected coffeeCartList: any = [];
  protected subtotal = 0;
  destroyRef = inject(DestroyRef);
  constructor(
    protected loadingService: LoadingService,
    private cartSignal: CartSignalService,
    private coffeeService: CoffeeService,
    private cartService: CartService,
    private toastr: ToastrService
  ) {}

  getCoffeeById(coffeeId: number, collectionId: string) {
    this.coffeeService
      .getSingleCoffee(coffeeId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((singleCoffee: any) => {
        singleCoffee[0].collectionId = collectionId;
        this.coffeeCartList.push(singleCoffee[0]);
        this.calculateSubtotalItemsCart();
      });
  }

  resetCartList() {
    this.coffeeCartList = [];
  }

  async getCartItems() {
    this.loadingService.loadingOn();
    this.cartService
      .getCartCoffeesFromDB()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((cartList: any) => {
        cartList.forEach((cartItem: any) => {
          this.getCoffeeById(cartItem.coffeeId, cartItem.id);
        });
        this.loadingService.loadingOff();
      });
  }

  calculateSubtotalItemsCart() {
    this.subtotal = this.coffeeCartList.reduce(
      (accumulator: any, currentSubtotal: any) =>
        accumulator + currentSubtotal.price,
      0
    );
  }

  handleRemoveFromCart(id: any) {
    this.cartService
      .removeCoffeeToCart(id)
      .then(() => {
        this.toastr.info('Removido da lista de compras');
        this.resetCartList();
        this.getCartItems();
      })
      .catch((error) => {
        console.log('erro: ', error);
      });
  }

  async ngOnInit() {
    this.getCartItems();
  }
}
