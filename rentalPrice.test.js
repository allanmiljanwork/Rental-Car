const rental = require('./rentalPrice');

describe('Test age', () => {

test('Driver under 18 cannot rent a car', () => {
    expect(rental.price('2025-01-01', '2025-02-02', 'Compact', 15))
    .toBe('Driver too young - cannot quote the price');
});

test('Those aged 18-21 can only rent Compact cars', () => {
    expect(rental.price('2025-01-01', '2025-02-02', 'Unknown', 18))
    .toBe('Drivers 21 y/o or less can only rent Compact vehicles.');
});

test('Those aged 18-21 can only rent Compact cars', () => {
    expect(rental.price('2025-01-01', '2025-02-02', 'Electric', 18))
    .toBe('Drivers 21 y/o or less can only rent Compact vehicles.');
});

test('Those aged 18-21 can only rent Compact cars', () => {
    expect(rental.price('2025-01-01', '2025-02-02', 'Cabrio', 18))
    .toBe('Drivers 21 y/o or less can only rent Compact vehicles.');
});

test('Those aged 18-21 can only rent Compact cars', () => {
    expect(rental.price('2025-01-01', '2025-02-02', 'Racer', 18))
    .toBe('Drivers 21 y/o or less can only rent Compact vehicles.');
});

});

describe('Testing rental pricing logic',() => {

    test('Checking if the price is calculated correctly during low season', () => {
        expect(rental.price('2025-01-01', '2025-01-03', 'Compact', 25, 2023))
        .toBe('50.00$')
    });

    test('Checking if the price is calculated correctly during high season', () => {
        expect(rental.price('2025-07-11', '2025-07-12', 'Electric', 25))
        .toBe('28.75$')
    });
    
    test('Checking if during high season the additional 15% is added ', () => {
        expect(rental.price('2024-05-01', '2024-06-01', 'Compact', 25))
        .toBe('802.12$')
    });
    
    test('Drivers with a license that is less than 2 years have to pay 30% more', () => {
        expect(rental.price('2024-01-01', '2024-02-01', 'Compact', 25, 2023))
        .toBe('775.00$')
    });
    
    test('Drivers under 25 with a Racer in low season', () => {
        expect(rental.price('2024-01-01', '2024-02-01', 'Racer', 24, 2015))
        .toBe('744.00$')
    });
    
    test('Drivers under 25 with a Racer in high season', () => {
        expect(rental.price('2024-06-01', '2024-07-01', 'Racer', 24, 2015))
        .toBe('1117.80$')
    });

    test('Drivers with a license that is less than 3 years and its high season', () => {
        expect(rental.price('2024-07-01', '2024-07-02', 'Compact', 0, 2024))
        .toBe('776.25$') // recieved 53.38$ age 25 + flat 15 + 1.15 + 1.30 
    });

});

