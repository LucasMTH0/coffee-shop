import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments';
import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CoffeeService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getCoffees() {
    return this.http.get(environment.COFFEE_API);
  }

  getSingleCoffee(id: any) {
    return this.http.get(`${environment.COFFEE_API}/${id}`);
  }

  getCoffeesByUser(coffeeList: any) {
    const userId = this.authService.getUserId();
    const cartFiltredByUser = coffeeList.filter(
      (coffeeItem: any) => coffeeItem.userId === userId
    );
    return cartFiltredByUser;
  }
}
