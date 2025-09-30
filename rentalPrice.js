// const VALID_CAR_TYPES = new Set(["Compact", "Electric", "Cabrio", "Racer"]);
//const carType = getCarType(carTypeInput);

const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const MONTH_NO_APRIL = 3;
const MONTH_NO_OCTOBER = 9;

function price(pickupDate, dropoffDate, carType, driverAge,) {
    const rentalDays = getRentalDays(pickupDate, dropoffDate);
    const highSeason = isHighSeason(pickupDate, dropoffDate);

    if (isTooYoung(driverAge)) {
        return "Driver too young - cannot quote the price";
    }

    if (isAgeRestricted(driverAge, carType)) {
        return "Drivers 21 y/o or less can only rent Compact vehicles";
    }

    let basePrice = calculateBasePrice(driverAge, rentalDays);

    let finalPrice = applySurcharges(basePrice, {basePrice, driverAge, carType, rentalDays, highSeason});

    return formatPrice(finalPrice);
}
    function calculateBasePrice(driverAge, rentalDays) {
        return driverAge * rentalDays;
    }

   function applySurcharges(basePrice, driverAge, carType, rentalDays, highSeason) {
    let finalPrice = basePrice;

    if (ageUnder25(driverAge, carType) && highSeason) {
        finalPrice *= 1.5;
    }

    if (highSeason) {
        finalPrice *= 1.15;
    }

    if (longRentDay(rentalDays) && !highSeason) {
        finalPrice *= 0.9;
    }

    return finalPrice;
}

function getRentalDays(pickupDate, dropoffDate) {
    const start = new Date(pickupDate);
    const end = new Date(dropoffDate);

    return Math.round(Math.abs((end - start) / DAY_IN_MILLISECONDS)) + 1;
}

function isHighSeason(pickupDate, dropoffDate) {
    const startMonth = new Date(pickupDate).getMonth();
    const endMonth = new Date(dropoffDate).getMonth();

    if (
        (startMonth >= MONTH_NO_APRIL && startMonth <= MONTH_NO_OCTOBER) ||
        (endMonth >= MONTH_NO_APRIL && endMonth <= MONTH_NO_OCTOBER) ||
        (startMonth < MONTH_NO_APRIL && endMonth > MONTH_NO_OCTOBER)) {
            return true;
        }
}




function isTooYoung(driverAge) {
    return driverAge < 18;
}

function isAgeRestricted(driverAge, carType) {
    return driverAge <= 21 && carType !== "Compact";
}

function ageUnder25(driverAge, carType) {
    return driverAge <= 25 && carType === "Racer";
}

function longRentDay(rentalDays) {
    return rentalDays > 10;
}



function formatPrice(finalPrice) {
    return 'Price: $' + finalPrice.toFixed(2);
}

exports.price = price;
exports.isAgeRestricted = isAgeRestricted;
exports.isTooYoung = isTooYoung;
exports.ageUnder25 = ageUnder25;
exports.longRentDay = longRentDay;
