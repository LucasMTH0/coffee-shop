import { TestBed } from '@angular/core/testing';

import { FormatValuesService } from './format-values.service';

describe('FormatValuesService', () => {
  let service: FormatValuesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatValuesService);
  });
  
  it('should format number value in dolar money format', () => {
    const testValue = service.formatPrice(12.99);
    expect(testValue).toEqual("$12.99");
  });

});
