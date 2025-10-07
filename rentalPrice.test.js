const rental = require('./rentalPrice');

test('Driver under 18 cannot rent a car', () => {
    expect(rental.price('2024-01-01', '2024-02-02', 'Compact', 15))
    .toBe('Driver too young - cannot quote the price');
});

test('Those aged 18-21 can only rent Compact cars', () => {
    expect(rental.price('2024-01-01', '2024-02-02', 'Unknown', 18))
    .toBe('Drivers 21 y/o or less can only rent Compact vehicles.');
});

test('Those aged 18-21 can only rent Compact cars', () => {
    expect(rental.price('2024-01-01', '2024-02-02', 'Electric', 18))
    .toBe('Drivers 21 y/o or less can only rent Compact vehicles.');
});

test('Those aged 18-21 can only rent Compact cars', () => {
    expect(rental.price('2024-01-01', '2024-02-02', 'Cabrio', 18))
    .toBe('Drivers 21 y/o or less can only rent Compact vehicles.');
});

test('Those aged 18-21 can only rent Compact cars', () => {
    expect(rental.price('2024-01-01', '2024-02-02', 'Racer', 18))
    .toBe('Drivers 21 y/o or less can only rent Compact vehicles.');
});

test('For Racers, the price is increased by 50% if the driver is 25 years old or younger', () => {
    expect(rental.price('2024-01-01', '2024-02-02', 'Racer', 18))
    .toBe('Drivers 21 y/o or less can only rent Compact vehicles.');
});

test('If renting in High season, price is increased by 15%', () => {
    expect(rental.price('2024-01-01', '2024-02-02', 'Racer', 18))
    .toBe('Drivers 21 y/o or less can only rent Compact vehicles.');
});


test('If renting for more than 10 days, price is decresed by 10%', () => {
    expect(rental.price('2024-01-01', '2024-02-02', 'Racer', 18))
    .toBe('Drivers 21 y/o or less can only rent Compact vehicles.');
});

test('The minimum rental price per day is equivalent to the age of the driver.', () => {
    expect(rental.price('2024-01-01', '2024-02-02', 'Racer', 18))
    .toBe('Drivers 21 y/o or less can only rent Compact vehicles.');
});


