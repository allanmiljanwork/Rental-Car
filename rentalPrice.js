function carType(type) {
  const selectVehicle = {
    Compact: "Compact",
    Electric: "Electric",
    Cabrio: "Cabrio",
    Racer: "Racer"
  };
  return selectVehicle[type] || "Unknown";
}

function getDays(pickupDate, dropoffDate) {
  const pickup = new Date(pickupDate);
  const dropoff = new Date(dropoffDate);

  const diffTime = Math.abs(dropoff - pickup);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function highSeason(pickupDate, dropoffDate) {
  const pickup = new Date(pickupDate);
  const dropoff = new Date(dropoffDate);

  const pickupMonth = pickup.getMonth(); 
  const dropoffMonth = dropoff.getMonth();

  return pickupMonth >= 4 && dropoffMonth <= 9;
}

function price(pickupDate, dropoffDate, type, age, licenseYear) {
  const selectedVehicle = carType(type);
  const days = getDays(pickupDate, dropoffDate);
  const season = highSeason(pickupDate, dropoffDate);
  const currentYear = new Date().getFullYear();

  if (age < 18) {
    return "Driver too young - cannot quote the price";
  }

  if ((currentYear - licenseYear) < 1) {
    return "Individuals holding a driver's license for less than a year are ineligible to rent.";
  }

  if (age <= 21 && selectedVehicle !== "Compact") {
    return "Drivers 21 y/o or less can only rent Compact vehicles.";
  }

  let rentalPrice = age * days;

  if (selectedVehicle === "Racer" && age <= 18 && season) {
    rentalPrice *= 1.5;
  }

  if (season) {
    rentalPrice *= 1.15;
  }

  if (days > 10 && season) {
    rentalPrice *= 0.9;
  }

  if ((currentYear - licenseYear) < 2) {
    rentalPrice *= 1.3;
  }

  if ((currentYear - licenseYear) < 3 && season) {
    rentalPrice += 15 * days;
  }

  return `$${rentalPrice.toFixed(2)}`;
}

exports.price = price;
