import { ListCoffeesComponent } from '@components/list-coffees/list-coffees.component';
import { CardCoffeeComponent } from '@components/card-coffee/card-coffee.component';
import { LoadingComponent } from '@components/loading/loading.component';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { LoadingService } from '@services/Loading/loading.service';
import { CoffeeService } from '@services/Coffee/coffee.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { coffee } from '../../types/Coffee';
import { NgxLoadingModule } from 'ngx-loading';
@Component({
  standalone: true,
  selector: 'app-home',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
  imports: [
    AsyncPipe,
    NgxLoadingModule,
    LoadingComponent,
    CardCoffeeComponent,
    ListCoffeesComponent,
  ],
})
export class HomeComponent implements OnInit {
  protected coffeesList: coffee[] = [];
  destroyRef = inject(DestroyRef);

  constructor(
    private coffeeService: CoffeeService,
    protected loadingService: LoadingService
  ) {}

  getCoffeesList() {
    this.loadingService.loadingOn();
    this.coffeeService
      .getCoffees()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((coffees: any) => {
        this.loadingService.loadingOff();
        this.coffeesList = coffees;
      });
  }

  ngOnInit() {
    this.getCoffeesList();
  }
}
