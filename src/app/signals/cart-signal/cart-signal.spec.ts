import { TestBed } from "@angular/core/testing";
import { CartSignalService } from "./cart-signal.service";

describe("Cart Signal", () => {
    let service: CartSignalService;

    beforeEach(() => {
      TestBed.configureTestingModule({});
      service = TestBed.inject(CartSignalService);
    });

    it("shoult return cart signal list", () => {
        const cartList = service.getCart()
        expect(cartList).toEqual([])
    })

    it("should add new coffee to cart list", () => {
      const coffeeTest = {
        "_id": "6424335b59f9f6fdd657d2e1",
        "id": 1,
        "name": "Signature Blend",
        "description": "A rich, full-bodied coffee with notes of dark chocolate and black cherry. Grown on the slopes of a mist-covered mountain in Central America.",
        "price": 12.99,
        "region": "Central America",
        "weight": 500,
        "flavor_profile": [
            "Dark Chocolate",
            "Black Cherry"
        ],
        "grind_option": [
            "Whole Bean",
            "Cafetiere",
            "Filter",
            "Espresso"
        ],
        "roast_level": 3,
        "image_url": "https://iili.io/H8Y78Qt.webp"
      }
      service.updateCartSignal(coffeeTest)
      const coffeeList = service.getCart()
      expect(coffeeList[0]).toEqual(coffeeTest);
    })

})