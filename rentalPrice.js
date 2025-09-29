const selectCar = new Set(["Compact", "Electric", "Cabrio", "Racer"]);

function getCar(type) {
  return selectCar.has(type) ? type : "Unknown";
}

function getDate(pickupDate, dropoffDate) {
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(pickupDate);
  const secondDate = new Date(dropoffDate);
  return Math.round(Math.abs((firstDate - secondDate) / oneDay)) + 1;
}

function getSeason(pickupDate, dropoffDate) {
  const pickupMonth = new Date(pickupDate).getMonth();
  const dropoffMonth = new Date(dropoffDate).getMonth();
  const highStart = 3; 
  const highEnd = 9;   

  if (
    (pickupMonth >= highStart && pickupMonth <= highEnd) ||
    (dropoffMonth >= highStart && dropoffMonth <= highEnd) ||
    (pickupMonth < highStart && dropoffMonth > highEnd)
  ) {
    return "High";
  } else {
    return "Low";
  }
}

function price(pickupDate, dropoffDate, type, age) {
  const carType = getCar(type);
  const days = getDate(pickupDate, dropoffDate);
  const season = getSeason(pickupDate, dropoffDate);

  if (age < 18) return "Driver too young - cannot quote the price";

  if (licenseYears < 1) return "Driver license must be held for at least 1 year";

  if (age <= 21 && carType !== "Compact") 
    return "Drivers 21 y/o or less can only rent Compact vehicles";

  let dailyPrice = Math.max(age, 1); 
  let totalPrice = dailyPrice * days;

  if (carType === "Racer" && age <= 25 && season === "High") {
    totalPrice *= 1.5;
  }

  if (season === "High") {
    totalPrice *= 1.15;
    
    if (licenseYears < 3) totalPrice += 15 * days;
  }

  if (licenseYears < 2) totalPrice *= 1.3;

  if (days > 10 && season === "Low") {
    totalPrice *= 0.9;
  }

  return `$${totalPrice.toFixed(2)}`;
}

exports.price = price;