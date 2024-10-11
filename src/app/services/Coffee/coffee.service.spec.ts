import { TestBed } from '@angular/core/testing';
import { CoffeeService } from './coffee.service';
import { provideHttpClient } from '@angular/common/http';


describe('Coffee Service', () => {
  let service: CoffeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [provideHttpClient()]
    });
    service = TestBed.inject(CoffeeService);
  });
  
  it('should return coffee list', async () => {
    const coffeeList = await service.getCoffees().toPromise()
    expect(coffeeList).toBeTruthy();
  });

  it('should return specific coffee by id', async () => {
    const coffee = await service.getSingleCoffee(1).toPromise()
    expect(coffee).toBeTruthy();
  })

});
