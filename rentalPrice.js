
const CAR_TYPE = {
  COMPACT: "Compact",
  ELECTRIC: "Electric",
  CABRIO: "Cabrio",
  RACER: "Racer"
};

const AGE_LIMIT = {
  MINIMUM: 18,
  COMPACT_ONLY: 21,
  RACER_SURCHARGE: 25
};

const LICENSE_REQUIREMENTS = {
  MINIMUM_YEARS: 1,
  SURCHARGE_TWO_YEARS: 2,
  ADDITIONAL_FEE_THREE_YEARS: 3
};

const PRICING = {
  HIGH_SEASON_MULTIPLIER: 1.15,
  LONG_RENTAL_DISCOUNT: 0.9,
  RACER_LOW_SEASON_MULTIPLIER: 1.5,
  NEW_LICENSE_MULTIPLIER: 1.3,
  NEW_LICENSE_DAILY_FEE: 15,
  LONG_RENTAL_DAYS: 10,
  WEEKEND_PRICE: 1.05 // implement weekend price aga kuidas käituda????????
};

const SEASON = {
  HIGH_SEASON_START_MONTH: 3, // Aprill 
  HIGH_SEASON_END_MONTH: 9    // Oktoober
};

function getCarType(type) {
  return CAR_TYPE[type] || "Unknown";
}

function calculateDays(pickupDate, dropoffDate) {
  const pickup = new Date(pickupDate);
  const dropoff = new Date(dropoffDate);
  const diffTime = Math.abs(dropoff - pickup);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function isHighSeason(pickupDate, dropoffDate) {
  const pickup = new Date(pickupDate);
  const dropoff = new Date(dropoffDate);
  const pickupMonth = pickup.getMonth();
  const dropoffMonth = dropoff.getMonth();

  return (
    pickupMonth >= SEASON.HIGH_SEASON_START_MONTH &&
    pickupMonth <= SEASON.HIGH_SEASON_END_MONTH &&
    dropoffMonth >= SEASON.HIGH_SEASON_START_MONTH &&
    dropoffMonth <= SEASON.HIGH_SEASON_END_MONTH
  );
}

function calculateLicenseYears(licenseYear) {
  return new Date().getFullYear() - licenseYear;
}
function validateRental(age, licenseYears, carType) {
  if (age < AGE_LIMIT.MINIMUM) {
    return "Driver too young - cannot quote the price";
  }

  if (licenseYears < LICENSE_REQUIREMENTS.MINIMUM_YEARS) {
    return "Individuals holding a driver's license for less than a year are ineligible to rent.";
  }

  if (age >= AGE_LIMIT.MINIMUM && age <= AGE_LIMIT.COMPACT_ONLY && carType == CAR_TYPES.COMPACT) {
    return "Drivers 21 y/o or less can only rent Compact vehicles.";
  }

  return null;
}

function calculateBasePrice(age, days) {
  return age * days;
}

function applyRacerSurcharge(price, carType, age, isHighSeason) {
  if (carType === CAR_TYPE.RACER && age <= AGE_LIMIT.RACER_SURCHARGE && isHighSeason) {
    return price * PRICING.RACER_HIGH_SEASON_MULTIPLIER;
  }
  return price;
}

function applySeasonalPricing(price, isHighSeason) {
  if (isHighSeason) {
    return price * PRICING.HIGH_SEASON_MULTIPLIER;
  }
  return price;
}

function applyLongRentalDiscount(price, days, isHighSeason) {
  if (days > PRICING.LONG_RENTAL_DAYS && isHighSeason) {
    return price * PRICING.LONG_RENTAL_DISCOUNT;
  }
  return price;
}

function applyNewLicenseSurcharge(price, licenseYears) {
  if (licenseYears < LICENSE_REQUIREMENTS.SURCHARGE_TWO_YEARS) {
    return price * PRICING.NEW_LICENSE_MULTIPLIER;
  }
  return price;
}

function applyNewLicenseSeasonalFee(price, licenseYears, days, isHighSeason) {
  if (licenseYears < LICENSE_REQUIREMENTS.ADDITIONAL_FEE_THREE_YEARS && isHighSeason) {
    return price + (PRICING.NEW_LICENSE_DAILY_FEE * days);
  }
  return price;
}

function price(pickupDate, dropoffDate, type, age, licenseYear) {
  const carType = getCarType(type);
  const days = calculateDays(pickupDate, dropoffDate);
  const highSeason = isHighSeason(pickupDate, dropoffDate);
  const licenseYears = calculateLicenseYears(licenseYear);

  const error = validateRental(age, licenseYears, carType);
  if (error) return error;

  let rentalPrice = calculateBasePrice(age, days);
  rentalPrice = applyRacerSurcharge(rentalPrice, carType, age, highSeason);
  rentalPrice = applySeasonalPricing(rentalPrice, highSeason);
  rentalPrice = applyLongRentalDiscount(rentalPrice, days, highSeason);
  rentalPrice = applyNewLicenseSurcharge(rentalPrice, licenseYears);
  rentalPrice = applyNewLicenseSeasonalFee(rentalPrice, licenseYears, days, highSeason);

  return `$${rentalPrice.toFixed(2)}`;
}

exports.price = price;