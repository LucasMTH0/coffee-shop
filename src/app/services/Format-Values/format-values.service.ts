import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatValuesService {
  private localeFormat: string = "pt-BR"

  formatPrice(price: number){
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(price);
  }
}
