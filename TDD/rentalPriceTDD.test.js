const rental = require('./rentalPriceTDD');

describe('Weekday/Weekend Pricing', () => {

  test('50 year old driver, rents car for one weekday day', () => {
    expect(rental.price('2025-01-06', '2025-01-07', 'Compact', 50, 2020))
      .toBe('50.00$'); 
  });

  test('50 year old driver rents a car for one weekend day', () => {
    expect(rental.price('2025-01-11', '2025-01-12', 'Compact', 50, 2020))
      .toBe('52.50$'); 
  });

   test('50 year old driver, rents car for three days: Monday, Tuesday, Wednesday', () => {
    expect(rental.price('2025-01-06', '2025-01-09', 'Compact', 50, 2020))
      .toBe('150.00$'); 
  });

  test('50 year old driver rents a car for three days: Thursday, Friday, Saturday', () => {
    expect(rental.price('2025-01-09', '2025-01-12', 'Compact', 50, 2020))
      .toBe('152.50$'); 
  });

});