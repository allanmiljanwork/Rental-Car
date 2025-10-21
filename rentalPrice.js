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
	RACER_HIGH_SEASON_MULTIPLIER: 1.5,
	HIGH_SEASON_MULTIPLIER: 1.15,
	LONG_RENTAL_DISCOUNT: 0.9,
	LONG_RENTAL_DAYS: 10,
	NEW_LICENSE_MULTIPLIER: 1.3,
	NEW_LICENSE_DAILY_FEE: 15
};

const SEASON = {
	HIGH_SEASON_START_MONTH: 3, // April 
	HIGH_SEASON_END_MONTH: 9 // October
};


function calculateDays(pickupDate, dropoffDate) {
	const pickup = new Date(pickupDate);
	const dropoff = new Date(dropoffDate);
	const diffTime = Math.abs(dropoff - pickup);
	return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function isHighSeason(pickupDate, dropoffDate) {
	const start = new Date(pickupDate);
	const end = new Date(dropoffDate);
	const startMonth = start.getMonth();
	const endMonth = end.getMonth();

	return (
		startMonth <= SEASON.HIGH_SEASON_END_MONTH &&
		endMonth >= SEASON.HIGH_SEASON_START_MONTH
	);
}

function calculateLicenseYears(licenseYear, pickupDate) {
	const pickup = new Date(pickupDate);
	return pickup.getFullYear() - licenseYear;
}

function validateRental(age, licenseYears, carType) {
	if (age < AGE_LIMIT.MINIMUM) {
		return "Driver too young - cannot quote the price";
	}

	if (licenseYears < LICENSE_REQUIREMENTS.MINIMUM_YEARS) {
		return "Individuals holding a driver's license for less than a year are ineligible to rent.";
	}

	if (
		age >= AGE_LIMIT.MINIMUM &&
		age <= AGE_LIMIT.COMPACT_ONLY &&
		carType !== CAR_TYPE.COMPACT
	) {
		return "Drivers 21 y/o or less can only rent Compact vehicles.";
	}

	return null;
}

function applyNewLicenseSurcharge(price, licenseYears) {
	return (licenseYears < LICENSE_REQUIREMENTS.SURCHARGE_TWO_YEARS) ?
		price * PRICING.NEW_LICENSE_MULTIPLIER :
		price;
}

function applySeasonalPricing(price, isHighSeason) {
	return isHighSeason ? price * PRICING.HIGH_SEASON_MULTIPLIER : price;
}

function applyNewLicenseSeasonalFee(price, licenseYears, days, isHighSeason) {
	if (
		licenseYears < LICENSE_REQUIREMENTS.ADDITIONAL_FEE_THREE_YEARS &&
		isHighSeason
	) {
		return price + PRICING.NEW_LICENSE_DAILY_FEE * days;
	}
	return price;
}

function applyRacerSurcharge(price, carType, age, isHighSeason) {
	if (
		carType === CAR_TYPE.RACER &&
		age <= AGE_LIMIT.RACER_SURCHARGE &&
		isHighSeason
	) {
		return price * PRICING.RACER_HIGH_SEASON_MULTIPLIER;
	}
	return price;
}

function applyLongRentalDiscount(price, days, isHighSeason) {
	if (days > PRICING.LONG_RENTAL_DAYS && !isHighSeason) {
		return price * PRICING.LONG_RENTAL_DISCOUNT;
	}
	return price;
}

function price(pickupDate, dropoffDate, type, age, licenseYear) {
	const carType = type;
	const days = calculateDays(pickupDate, dropoffDate);
	const highSeason = isHighSeason(pickupDate, dropoffDate);
	const licenseYears = calculateLicenseYears(licenseYear, pickupDate);

	const error = validateRental(age, licenseYears, carType);
	if (error) return error;

	let rentalPrice = age * days;

	rentalPrice = applyNewLicenseSurcharge(rentalPrice, licenseYears);
	rentalPrice = applySeasonalPricing(rentalPrice, highSeason);
	rentalPrice = applyNewLicenseSeasonalFee(
		rentalPrice,
		licenseYears,
		days,
		highSeason
	);
	rentalPrice = applyRacerSurcharge(rentalPrice, carType, age, highSeason);
	rentalPrice = applyLongRentalDiscount(rentalPrice, days, highSeason);

	return `${rentalPrice.toFixed(2)}$`;
}

exports.price = price;