import { FormatValuesService } from '@services/Format-Values/format-values.service';
import { Component, DestroyRef, inject, Input } from '@angular/core';
import { LoadingService } from '@services/Loading/loading.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CartService } from '@services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { CoffeeService } from '@services/Coffee/coffee.service';
@Component({
  templateUrl: './subtotal-cart.component.html',
  styleUrl: './subtotal-cart.component.scss',
  selector: 'app-subtotal-cart',
  standalone: true,
  imports: [],
})
export class SubtotalCartComponent {
  destroyRef = inject(DestroyRef);
  @Input() subTotal: number = 0;
  constructor(
    protected formatService: FormatValuesService,
    private loadingService: LoadingService,
    private coffeeService: CoffeeService,
    private cartService: CartService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  handleSubmitBuy() {
    // this.loadingService.loadingOn();
    this.cartService
      .getCartCoffeesFromDB()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((cartList: any) => {
        const cartFiltredByUser = this.coffeeService.getCoffeesByUser(cartList);
        this.cartService
          .submitCoffeeCart(cartFiltredByUser)
          .then(() => {
            this.toastr.success('Compra efetuada!');
            this.router.navigate(['/']);
          })
          .catch((error) => console.error(error));
        // .finally(() => this.loadingService.loadingOff());
      });
  }
}
