const rental = require('./rentalPrice');

describe('Rental Rules', () => {

    test('Individuals under the age of 18 are ineligible to rent a car', () => {
        expect(rental.price('2024-01-01', '2024-01-05', 'Compact', 17))
            .toBe('Driver too young - cannot quote the price');
    });

    test('Drivers aged 18-21 can only rent Compact cars', () => {
        expect(rental.price('2024-02-01', '2024-02-05', 'Electric', 20))
            .toBe('Drivers 21 y/o or less can only rent Compact vehicles');
    });

    test('Drivers aged 18-21 can rent Compact cars', () => {
        expect(rental.price('2024-02-01', '2024-02-05', 'Compact', 20))
    });

});
