const evDatabase = [
  { brand: "Tesla", model: "Model 3", version: "RWD", consumption: 14.5, battery: 60 },
  { brand: "Tesla", model: "Model 3", version: "Long Range", consumption: 15.5, battery: 75 },
  { brand: "Tesla", model: "Model 3", version: "Performance", consumption: 17, battery: 75 },
  { brand: "Tesla", model: "Model Y", version: "RWD", consumption: 16, battery: 60 },
  { brand: "Tesla", model: "Model Y", version: "Long Range", consumption: 17, battery: 75 },
  { brand: "Tesla", model: "Model Y", version: "Performance", consumption: 18.5, battery: 75 },
  { brand: "Tesla", model: "Model S", version: "Long Range", consumption: 18, battery: 95 },
  { brand: "Tesla", model: "Model S", version: "Plaid", consumption: 19.5, battery: 95 },
  { brand: "Tesla", model: "Model X", version: "Long Range", consumption: 21, battery: 95 },
  { brand: "Tesla", model: "Model X", version: "Plaid", consumption: 22.5, battery: 95 },
  { brand: "Kia", model: "EV3", version: "Standard Range", consumption: 15.5, battery: 58 },
  { brand: "Kia", model: "EV3", version: "Long Range", consumption: 16, battery: 81 },
  { brand: "Kia", model: "EV6", version: "RWD", consumption: 17.5, battery: 77 },
  { brand: "Kia", model: "EV6", version: "AWD", consumption: 19, battery: 77 },
  { brand: "Kia", model: "Niro", version: "EV", consumption: 16.5, battery: 65 },
  { brand: "Kia", model: "EV9", version: "RWD", consumption: 22, battery: 99 },
  { brand: "Kia", model: "EV9", version: "AWD", consumption: 24, battery: 99 },
  { brand: "Hyundai", model: "Kona Electric", version: "48 kWh", consumption: 15, battery: 48 },
  { brand: "Hyundai", model: "Kona Electric", version: "65 kWh", consumption: 15.5, battery: 65 },
  { brand: "Hyundai", model: "Ioniq 5", version: "RWD", consumption: 17.5, battery: 77 },
  { brand: "Hyundai", model: "Ioniq 5", version: "AWD", consumption: 19, battery: 77 },
  { brand: "Hyundai", model: "Ioniq 6", version: "RWD", consumption: 14.5, battery: 77 },
  { brand: "Hyundai", model: "Ioniq 6", version: "AWD", consumption: 16, battery: 77 },
  { brand: "Volkswagen", model: "ID.3", version: "Pro", consumption: 15.8, battery: 58 },
  { brand: "Volkswagen", model: "ID.3", version: "Pro S", consumption: 16.2, battery: 77 },
  { brand: "Volkswagen", model: "ID.4", version: "Pro", consumption: 18, battery: 77 },
  { brand: "Volkswagen", model: "ID.5", version: "Pro", consumption: 18.2, battery: 77 },
  { brand: "Volkswagen", model: "ID.7", version: "Pro", consumption: 16.5, battery: 77 },
  { brand: "Volkswagen", model: "ID. Buzz", version: "Pro", consumption: 21, battery: 77 },
  { brand: "Volvo", model: "EX30", version: "Single Motor", consumption: 16.5, battery: 51 },
  { brand: "Volvo", model: "EX30", version: "Extended Range", consumption: 17, battery: 69 },
  { brand: "Volvo", model: "EX30", version: "Twin Motor Performance", consumption: 18.5, battery: 69 },
  { brand: "Volvo", model: "EX40", version: "Single Motor", consumption: 18.5, battery: 69 },
  { brand: "Volvo", model: "EX40", version: "Twin Motor", consumption: 20, battery: 78 },
  { brand: "Volvo", model: "EX90", version: "Twin Motor", consumption: 22, battery: 107 },
  { brand: "BMW", model: "i4", version: "eDrive35", consumption: 16.5, battery: 67 },
  { brand: "BMW", model: "i4", version: "eDrive40", consumption: 17, battery: 81 },
  { brand: "BMW", model: "i4", version: "M50", consumption: 19, battery: 81 },
  { brand: "BMW", model: "iX1", version: "eDrive20", consumption: 17.5, battery: 64 },
  { brand: "BMW", model: "iX1", version: "xDrive30", consumption: 18.5, battery: 64 },
  { brand: "BMW", model: "iX3", version: "Standard", consumption: 18.5, battery: 74 },
  { brand: "BMW", model: "iX", version: "xDrive40", consumption: 21, battery: 71 },
  { brand: "BMW", model: "iX", version: "xDrive50", consumption: 22, battery: 105 },
  { brand: "Renault", model: "Renault 5 E-Tech", version: "40 kWh", consumption: 14.5, battery: 40 },
  { brand: "Renault", model: "Renault 5 E-Tech", version: "52 kWh", consumption: 15, battery: 52 },
  { brand: "Renault", model: "Megane E-Tech", version: "EV40", consumption: 15.5, battery: 40 },
  { brand: "Renault", model: "Megane E-Tech", version: "EV60", consumption: 16, battery: 60 },
  { brand: "Renault", model: "Scenic E-Tech", version: "Standard Range", consumption: 16.5, battery: 60 },
  { brand: "Renault", model: "Scenic E-Tech", version: "Long Range", consumption: 17, battery: 87 },
  { brand: "MG", model: "MG4", version: "Standard", consumption: 15.5, battery: 51 },
  { brand: "MG", model: "MG4", version: "Comfort", consumption: 15.8, battery: 64 },
  { brand: "MG", model: "MG4", version: "Luxury", consumption: 16, battery: 64 },
  { brand: "MG", model: "MG4", version: "XPower", consumption: 18.5, battery: 64 },
  { brand: "MG", model: "MG ZS EV", version: "Standard Range", consumption: 16.5, battery: 51 },
  { brand: "MG", model: "MG ZS EV", version: "Long Range", consumption: 17.5, battery: 72 },
  { brand: "MG", model: "MG5 Electric", version: "Standard", consumption: 17, battery: 61 },
  { brand: "Skoda", model: "Enyaq", version: "60", consumption: 17, battery: 58 },
  { brand: "Skoda", model: "Enyaq", version: "85", consumption: 17.5, battery: 77 },
  { brand: "Skoda", model: "Enyaq Coupe", version: "85", consumption: 17.2, battery: 77 },
  { brand: "Skoda", model: "Enyaq", version: "RS", consumption: 19, battery: 77 },
  { brand: "Skoda", model: "Elroq", version: "50", consumption: 15.8, battery: 52 },
  { brand: "Skoda", model: "Elroq", version: "60", consumption: 16.5, battery: 63 },
  { brand: "Skoda", model: "Elroq", version: "85", consumption: 17, battery: 82 },
  { brand: "Nissan", model: "Leaf", version: "40 kWh", consumption: 16.5, battery: 40 },
  { brand: "Nissan", model: "Leaf", version: "e+ 62 kWh", consumption: 17.5, battery: 62 },
  { brand: "Nissan", model: "Ariya", version: "63 kWh", consumption: 18, battery: 63 },
  { brand: "Nissan", model: "Ariya", version: "87 kWh", consumption: 19, battery: 87 },
  { brand: "Nissan", model: "Ariya", version: "e-4ORCE 87 kWh", consumption: 20.5, battery: 87 },
  { brand: "Peugeot", model: "e-208", version: "Standard", consumption: 15.5, battery: 51 },
  { brand: "Peugeot", model: "e-2008", version: "Standard", consumption: 16.8, battery: 51 },
  { brand: "Peugeot", model: "e-308", version: "Standard", consumption: 15.8, battery: 51 },
  { brand: "Peugeot", model: "e-3008", version: "Standard Range", consumption: 17.5, battery: 73 },
  { brand: "Peugeot", model: "e-3008", version: "Long Range", consumption: 18, battery: 98 },
  { brand: "Peugeot", model: "e-5008", version: "Standard", consumption: 18.5, battery: 73 },
  { brand: "Mercedes", model: "EQA", version: "250", consumption: 17.5, battery: 66 },
  { brand: "Mercedes", model: "EQA", version: "300 4MATIC", consumption: 18.5, battery: 66 },
  { brand: "Mercedes", model: "EQB", version: "250", consumption: 18.5, battery: 66 },
  { brand: "Mercedes", model: "EQB", version: "300 4MATIC", consumption: 19.5, battery: 66 },
  { brand: "Mercedes", model: "EQE", version: "300", consumption: 18, battery: 89 },
  { brand: "Mercedes", model: "EQE", version: "350+", consumption: 17.5, battery: 89 },
  { brand: "Mercedes", model: "EQS", version: "450+", consumption: 18.5, battery: 108 },
  { brand: "Mercedes", model: "EQS SUV", version: "450", consumption: 23, battery: 108 },
  { brand: "Audi", model: "Q4 e-tron", version: "45", consumption: 18, battery: 77 },
  { brand: "Audi", model: "Q4 e-tron", version: "55 quattro", consumption: 19.5, battery: 77 },
  { brand: "Audi", model: "Q6 e-tron", version: "Standard", consumption: 18.5, battery: 95 },
  { brand: "Audi", model: "Q6 e-tron", version: "quattro", consumption: 19.5, battery: 95 },
  { brand: "Audi", model: "A6 e-tron", version: "Standard", consumption: 17.5, battery: 94 },
  { brand: "Audi", model: "A6 e-tron", version: "quattro", consumption: 18.5, battery: 94 },
  { brand: "Audi", model: "e-tron GT", version: "Standard", consumption: 20, battery: 84 },
  { brand: "Polestar", model: "Polestar 2", version: "Standard Range", consumption: 16.5, battery: 69 },
  { brand: "Polestar", model: "Polestar 2", version: "Long Range Single Motor", consumption: 17, battery: 82 },
  { brand: "Polestar", model: "Polestar 2", version: "Long Range Dual Motor", consumption: 18.5, battery: 82 },
  { brand: "Polestar", model: "Polestar 3", version: "Long Range Dual Motor", consumption: 22, battery: 107 },
  { brand: "Polestar", model: "Polestar 4", version: "Long Range Single Motor", consumption: 18, battery: 94 },
  { brand: "Polestar", model: "Polestar 4", version: "Long Range Dual Motor", consumption: 19.5, battery: 94 },
  { brand: "BYD", model: "Dolphin", version: "Comfort", consumption: 15.5, battery: 60 },
  { brand: "BYD", model: "Atto 3", version: "Standard", consumption: 16.5, battery: 60 },
  { brand: "BYD", model: "Seal", version: "Design", consumption: 16.5, battery: 82 },
  { brand: "BYD", model: "Seal", version: "Excellence AWD", consumption: 18.5, battery: 82 },
  { brand: "BYD", model: "Seal U", version: "Standard", consumption: 18.5, battery: 72 },
  { brand: "BYD", model: "Tang", version: "Standard", consumption: 23, battery: 86 },
  { brand: "Fiat", model: "500e", version: "24 kWh", consumption: 13.5, battery: 24 },
  { brand: "Fiat", model: "500e", version: "42 kWh", consumption: 14.5, battery: 42 },
  { brand: "Fiat", model: "600e", version: "Standard", consumption: 15.8, battery: 51 },
  { brand: "Opel", model: "Corsa Electric", version: "Standard", consumption: 15.5, battery: 51 },
  { brand: "Opel", model: "Mokka Electric", version: "Standard", consumption: 16.5, battery: 51 },
  { brand: "Opel", model: "Astra Electric", version: "Standard", consumption: 15.8, battery: 51 },
  { brand: "Opel", model: "Grandland Electric", version: "Standard", consumption: 17.5, battery: 73 },
  { brand: "Mini", model: "Cooper", version: "E", consumption: 14.5, battery: 37 },
  { brand: "Mini", model: "Cooper", version: "SE", consumption: 15, battery: 49 },
  { brand: "Mini", model: "Countryman", version: "E", consumption: 17, battery: 64 },
  { brand: "Mini", model: "Countryman", version: "SE ALL4", consumption: 18.5, battery: 64 },
  { brand: "Tesla", model: "Model 3 Highland", version: "RWD", consumption: 14.5, battery: 60 },
  { brand: "Tesla", model: "Model 3 Highland", version: "Long Range", consumption: 15.5, battery: 75 },
  { brand: "Tesla", model: "Model 3 Highland", version: "Performance", consumption: 17, battery: 75 },
  { brand: "Tesla", model: "Model Y Juniper", version: "RWD", consumption: 15.5, battery: 60 },
  { brand: "Tesla", model: "Model Y Juniper", version: "Long Range", consumption: 16.5, battery: 75 },
  { brand: "Dacia", model: "Spring", version: "Essential 45", consumption: 13.9, battery: 26.8 },
  { brand: "Dacia", model: "Spring", version: "Expression 65", consumption: 14.6, battery: 26.8 },
  { brand: "Citroën", model: "ë-C3", version: "Standard", consumption: 16.7, battery: 44 },
  { brand: "Ford", model: "Explorer Electric", version: "Standard Range RWD", consumption: 16.7, battery: 52 },
  { brand: "Ford", model: "Explorer Electric", version: "Extended Range RWD", consumption: 15.7, battery: 77 },
  { brand: "Ford", model: "Explorer Electric", version: "Extended Range AWD", consumption: 17.2, battery: 79 },
  { brand: "Ford", model: "Mustang Mach-E", version: "Standard Range RWD", consumption: 17.3, battery: 72.6 },
  { brand: "Ford", model: "Mustang Mach-E", version: "Extended Range RWD", consumption: 17.3, battery: 91 },
  { brand: "Ford", model: "Mustang Mach-E", version: "Extended Range AWD", consumption: 19.5, battery: 91 },
  { brand: "Toyota", model: "bZ4X", version: "FWD", consumption: 16.7, battery: 64 },
  { brand: "Toyota", model: "bZ4X", version: "AWD", consumption: 18, battery: 64 },
  { brand: "Subaru", model: "Solterra", version: "AWD", consumption: 18.1, battery: 64 },
  { brand: "Smart", model: "#1", version: "Pro+", consumption: 16.8, battery: 62 },
  { brand: "Smart", model: "#1", version: "Premium", consumption: 16.8, battery: 62 },
  { brand: "Smart", model: "#1", version: "Brabus", consumption: 18.2, battery: 62 },
  { brand: "Smart", model: "#3", version: "Pro+", consumption: 16.3, battery: 62 },
  { brand: "Smart", model: "#3", version: "Premium", consumption: 16.3, battery: 62 },
  { brand: "Smart", model: "#3", version: "Brabus", consumption: 17.6, battery: 62 },
  { brand: "Cupra", model: "Born", version: "59 kWh", consumption: 15.5, battery: 59 },
  { brand: "Cupra", model: "Born", version: "77 kWh", consumption: 15.7, battery: 77 },
  { brand: "Cupra", model: "Born", version: "VZ", consumption: 17.2, battery: 79 },
  { brand: "Cupra", model: "Tavascan", version: "Endurance", consumption: 16.5, battery: 77 },
  { brand: "Cupra", model: "Tavascan", version: "VZ", consumption: 18.5, battery: 77 },
  { brand: "XPeng", model: "G6", version: "Standard Range", consumption: 17.5, battery: 66 },
  { brand: "XPeng", model: "G6", version: "Long Range", consumption: 17.5, battery: 87.5 },
  { brand: "XPeng", model: "G6", version: "Performance AWD", consumption: 19, battery: 87.5 },
  { brand: "Leapmotor", model: "T03", version: "Standard", consumption: 16.3, battery: 37.3 },
  { brand: "Leapmotor", model: "C10", version: "Standard", consumption: 19.8, battery: 69.9 },
];

const defaults = {
  kilometers: 15000,
  evConsumption: 16.5,
  batteryCapacity: 60,
  homePrice: 0.3,
  fastPrice: 0.65,
  homePercentage: 80,
  fastPercentage: 20,
  chargingLoss: 10,
  fuelPrice: 2.05,
  fuelConsumption: 6.5,
};

const fields = {
  kilometers: document.querySelector("#kilometers"),
  evConsumption: document.querySelector("#ev-consumption"),
  batteryCapacity: document.querySelector("#battery-capacity"),
  homePrice: document.querySelector("#home-price"),
  fastPrice: document.querySelector("#fast-price"),
  homePercentage: document.querySelector("#home-percentage"),
  fastPercentage: document.querySelector("#fast-percentage"),
  chargingLoss: document.querySelector("#charging-loss"),
  fuelPrice: document.querySelector("#fuel-price"),
  fuelConsumption: document.querySelector("#fuel-consumption"),
};

const output = {
  heroSaving: document.querySelector("#hero-saving"),
  costMonth: document.querySelector("#cost-month"),
  costYear: document.querySelector("#cost-year"),
  cost100: document.querySelector("#cost-100"),
  fuelYear: document.querySelector("#fuel-year"),
  savingYear: document.querySelector("#saving-year"),
  savingMonth: document.querySelector("#saving-month"),
  kwhYear: document.querySelector("#kwh-year"),
  chargesYear: document.querySelector("#charges-year"),
  homeCostYear: document.querySelector("#home-cost-year"),
  fastCostYear: document.querySelector("#fast-cost-year"),
  economicTotalYear: document.querySelector("#economic-total-year"),
  barEvLabel: document.querySelector("#bar-ev-label"),
  barFuelLabel: document.querySelector("#bar-fuel-label"),
  barEv: document.querySelector("#bar-ev"),
  barFuel: document.querySelector("#bar-fuel"),
  conclusionText: document.querySelector("#conclusion-text"),
};

const generalError = document.querySelector("#general-error");
const conclusion = document.querySelector("#conclusion");
const resetButton = document.querySelector("#reset-button");
const menuButton = document.querySelector(".menu-button");
const mainNav = document.querySelector("#main-nav");
const carEntryModes = document.querySelectorAll('input[name="car-entry-mode"]');
const carListFields = document.querySelector("#car-list-fields");
const customCarFields = document.querySelector("#custom-car-fields");
const carBrand = document.querySelector("#car-brand");
const carModel = document.querySelector("#car-model");
const carTrim = document.querySelector("#car-trim");
const customCarBrand = document.querySelector("#custom-car-brand");
const customCarModel = document.querySelector("#custom-car-model");
const customCarTrim = document.querySelector("#custom-car-trim");
const selectedCarName = document.querySelector("#selected-car-name");
const vehicleDatabaseStatus = document.querySelector("#vehicle-database-status");
const homePercentageLabel = document.querySelector("#home-percentage-label");
const fastPercentageLabel = document.querySelector("#fast-percentage-label");
const chargingPresets = document.querySelectorAll(".charging-preset");
const solarRangeFields = {
  panelCount: document.querySelector("#panel-count"),
  panelWattage: document.querySelector("#panel-wattage"),
  yieldFactor: document.querySelector("#yield-factor"),
  solarToCarPercentage: document.querySelector("#solar-to-car-percentage"),
  consumption: document.querySelector("#solar-car-consumption"),
};
const solarRangeOutput = {
  totalPanelPower: document.querySelector("#total-panel-power"),
  annualYield: document.querySelector("#annual-solar-yield"),
  kwhForCar: document.querySelector("#solar-kwh-for-car"),
  rangeYear: document.querySelector("#solar-range-year"),
  rangeMonth: document.querySelector("#solar-range-month"),
  conclusion: document.querySelector("#solar-range-conclusion"),
};
const solarToCarLabel = document.querySelector("#solar-to-car-label");
const solarConsumptionLabel = document.querySelector("#solar-consumption-label");

const euroWhole = new Intl.NumberFormat("nl-NL", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const wholeNumber = new Intl.NumberFormat("nl-NL", {
  maximumFractionDigits: 0,
});

function getValues() {
  return Object.fromEntries(
    Object.entries(fields).map(([key, field]) => [key, Number.parseFloat(field.value)]),
  );
}

function validate(values) {
  let isValid = true;

  Object.entries(fields).forEach(([key, field]) => {
    const value = values[key];
    const minimum = Number.parseFloat(field.min);
    const maximum = Number.parseFloat(field.max);
    const invalid =
      !Number.isFinite(value) ||
      (Number.isFinite(minimum) && value < minimum) ||
      (Number.isFinite(maximum) && value > maximum);

    field.closest(".field")?.classList.toggle("invalid", invalid);
    field.setAttribute("aria-invalid", String(invalid));
    isValid = isValid && !invalid;
  });

  generalError.hidden = isValid;

  return isValid;
}

function calculateMainCosts(values) {
  const baseKwhPerYear = (values.kilometers / 100) * values.evConsumption;
  const totalKwhWithLoss = baseKwhPerYear * (1 + values.chargingLoss / 100);
  const homeKwh = totalKwhWithLoss * (values.homePercentage / 100);
  const fastKwh = totalKwhWithLoss * (values.fastPercentage / 100);
  const homeChargingCost = homeKwh * values.homePrice;
  const fastChargingCost = fastKwh * values.fastPrice;
  const totalEvCost = homeChargingCost + fastChargingCost;
  const monthlyCost = totalEvCost / 12;
  const costPer100Km = (totalEvCost / values.kilometers) * 100;
  const yearlyFuelCost =
    (values.kilometers / 100) * values.fuelConsumption * values.fuelPrice;
  const yearlySaving = yearlyFuelCost - totalEvCost;
  const monthlySaving = yearlySaving / 12;
  const chargesPerYear = totalKwhWithLoss / values.batteryCapacity;

  return {
    totalKwhWithLoss,
    totalEvCost,
    monthlyCost,
    costPer100Km,
    yearlyFuelCost,
    yearlySaving,
    monthlySaving,
    chargesPerYear,
    homeChargingCost,
    fastChargingCost,
  };
}

function setText(element, text) {
  element.textContent = text;
}

function getDisplayedChargingCosts(results) {
  const totalEuros = Math.round(results.totalEvCost);
  const homeEuros = Math.round(results.homeChargingCost);
  const fastEuros = totalEuros - homeEuros;

  return {
    total: totalEuros,
    home: homeEuros,
    fast: fastEuros,
  };
}

function renderEmptyState() {
  Object.values(output).forEach((element) => {
    if (element instanceof HTMLElement && !element.classList.contains("bar")) {
      element.textContent = "–";
    }
  });
  output.barEv.style.width = "0%";
  output.barFuel.style.width = "0%";
}

function renderResults(results) {
  const savingIsPositive = results.yearlySaving >= 0;
  const maxCost = Math.max(results.totalEvCost, results.yearlyFuelCost, 1);
  const evWidth = Math.max((results.totalEvCost / maxCost) * 100, 3);
  const fuelWidth = Math.max((results.yearlyFuelCost / maxCost) * 100, 3);
  const displayedChargingCosts = getDisplayedChargingCosts(results);
  const displayedTotalEvCost = displayedChargingCosts.total;

  setText(output.costMonth, euroWhole.format(results.monthlyCost));
  setText(output.costYear, euroWhole.format(displayedTotalEvCost));
  setText(output.cost100, euroWhole.format(results.costPer100Km));
  setText(output.fuelYear, euroWhole.format(results.yearlyFuelCost));
  setText(output.savingYear, euroWhole.format(results.yearlySaving));
  setText(output.savingMonth, euroWhole.format(results.monthlySaving));
  setText(output.kwhYear, `${wholeNumber.format(results.totalKwhWithLoss)} kWh`);
  setText(output.chargesYear, wholeNumber.format(results.chargesPerYear));
  setText(output.homeCostYear, euroWhole.format(displayedChargingCosts.home));
  setText(output.fastCostYear, euroWhole.format(displayedChargingCosts.fast));
  setText(output.economicTotalYear, euroWhole.format(displayedTotalEvCost));
  updateSolarInputsFromMainCalculator(results);
  setText(output.barEvLabel, euroWhole.format(displayedTotalEvCost));
  setText(output.barFuelLabel, euroWhole.format(results.yearlyFuelCost));
  setText(output.heroSaving, euroWhole.format(results.yearlySaving));

  output.barEv.style.width = `${evWidth}%`;
  output.barFuel.style.width = `${fuelWidth}%`;

  conclusion.classList.toggle("negative", !savingIsPositive);
  conclusion.querySelector(".conclusion-icon").textContent = savingIsPositive ? "✓" : "!";

  const comparisonText = savingIsPositive
    ? `Vergeleken met benzine bespaar je ongeveer ${euroWhole.format(results.yearlySaving)} per jaar.`
    : `Vergeleken met benzine betaal je ongeveer ${euroWhole.format(Math.abs(results.yearlySaving))} meer per jaar.`;

  setText(
    output.conclusionText,
    `Op basis van jouw invoer kost elektrisch rijden ${euroWhole.format(displayedTotalEvCost)} per jaar, ongeveer ${euroWhole.format(results.monthlyCost)} per maand. ${comparisonText}`,
  );
}

function updateCalculator() {
  const values = getValues();
  if (!validate(values)) {
    renderEmptyState();
    return;
  }

  renderResults(calculateMainCosts(values));
}

function getNumericValues(fieldCollection) {
  return Object.fromEntries(
    Object.entries(fieldCollection).map(([key, field]) => [key, Number.parseFloat(field.value)]),
  );
}

function valuesAreValid(values) {
  return Object.values(values).every((value) => Number.isFinite(value) && value >= 0);
}

function calculateSolarRange() {
  const values = getNumericValues(solarRangeFields);
  if (!valuesAreValid(values) || values.consumption <= 0 || values.yieldFactor <= 0) {
    return;
  }

  const annualYield = values.panelCount * values.panelWattage * values.yieldFactor;
  const totalPanelPower = (values.panelCount * values.panelWattage) / 1000;
  const kwhForCar = annualYield * (values.solarToCarPercentage / 100);
  const rangeYear = (kwhForCar / values.consumption) * 100;
  const rangeMonth = rangeYear / 12;

  solarToCarLabel.textContent = `${values.solarToCarPercentage}%`;
  solarConsumptionLabel.textContent = `${values.consumption.toLocaleString("nl-NL", {
    maximumFractionDigits: 1,
  })} kWh/100 km`;
  setText(
    solarRangeOutput.totalPanelPower,
    `${totalPanelPower.toLocaleString("nl-NL", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} kWp`,
  );
  setText(solarRangeOutput.annualYield, `${wholeNumber.format(annualYield)} kWh`);
  setText(solarRangeOutput.kwhForCar, `${wholeNumber.format(kwhForCar)} kWh`);
  setText(solarRangeOutput.rangeYear, `${wholeNumber.format(rangeYear)} km`);
  setText(solarRangeOutput.rangeMonth, `${wholeNumber.format(rangeMonth)} km`);
  setText(
    solarRangeOutput.conclusion,
    `Met jouw zonnepanelen kun je ongeveer ${wholeNumber.format(rangeYear)} km per jaar rijden op eigen zonnestroom.`,
  );
}

function updateSolarInputsFromMainCalculator(results) {
  solarRangeFields.consumption.value = fields.evConsumption.value;
  calculateSolarRange();
}

function uniqueSorted(values) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, "nl"));
}

function formatVehicleName(vehicle) {
  const modelName = vehicle.model.toLowerCase().startsWith(vehicle.brand.toLowerCase())
    ? vehicle.model
    : `${vehicle.brand} ${vehicle.model}`;
  return `${modelName} ${vehicle.version}`;
}

function setSelectOptions(select, options, placeholder) {
  select.innerHTML = "";

  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.textContent = placeholder;
  select.append(placeholderOption);

  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option;
    optionElement.textContent = option;
    select.append(optionElement);
  });
}

function populateBrands() {
  const brands = uniqueSorted(evDatabase.map((car) => car.brand));
  setSelectOptions(carBrand, brands, "Kies een merk");
  vehicleDatabaseStatus.textContent = `${evDatabase.length} uitvoeringen van ${brands.length} merken beschikbaar`;
}

function populateModels(selectedBrand) {
  const models = uniqueSorted(
    evDatabase.filter((car) => car.brand === selectedBrand).map((car) => car.model),
  );

  setSelectOptions(carModel, models, models.length ? "Kies een model" : "Kies eerst een merk");
  setSelectOptions(carTrim, [], "Kies eerst een model");
  carModel.disabled = models.length === 0;
  carTrim.disabled = true;
  selectedCarName.textContent = selectedBrand || "Pas de standaardwaarden aan";
}

function populateVersions(selectedBrand, selectedModel) {
  const versions = uniqueSorted(
    evDatabase
      .filter((car) => car.brand === selectedBrand && car.model === selectedModel)
      .map((car) => car.version),
  );

  setSelectOptions(
    carTrim,
    versions,
    versions.length ? "Kies een uitvoering" : "Kies eerst een model",
  );
  carTrim.disabled = versions.length === 0;
  selectedCarName.textContent = [selectedBrand, selectedModel].filter(Boolean).join(" ");
}

function selectVehicle() {
  const selectedCar = evDatabase.find(
    (car) =>
      car.brand === carBrand.value &&
      car.model === carModel.value &&
      car.version === carTrim.value,
  );

  if (!selectedCar) {
    return;
  }

  fields.evConsumption.value = selectedCar.consumption;
  fields.batteryCapacity.value = selectedCar.battery;
  selectedCarName.textContent = formatVehicleName(selectedCar);
  updateCalculator();
}

function updateCustomCarName() {
  const name = [customCarBrand.value, customCarModel.value, customCarTrim.value]
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" ");
  selectedCarName.textContent = name || "Vul de gegevens van jouw auto in";
}

function toggleVehicleInputMode(mode) {
  const useList = mode === "list";
  carListFields.hidden = !useList;
  customCarFields.hidden = useList;

  if (useList) {
    const selectedCar = evDatabase.find(
      (car) =>
        car.brand === carBrand.value &&
        car.model === carModel.value &&
        car.version === carTrim.value,
    );
    selectedCarName.textContent = selectedCar
      ? formatVehicleName(selectedCar)
      : "Kies een auto of pas de standaardwaarden aan";
  } else {
    updateCustomCarName();
  }
}

function updateChargingMix(homePercentage, shouldCalculate = true) {
  const safeHomePercentage = Math.min(100, Math.max(0, Number(homePercentage) || 0));
  const fastPercentage = 100 - safeHomePercentage;

  fields.homePercentage.value = safeHomePercentage;
  fields.fastPercentage.value = fastPercentage;
  homePercentageLabel.textContent = `${safeHomePercentage}%`;
  fastPercentageLabel.textContent = `${fastPercentage}%`;

  chargingPresets.forEach((preset) => {
    preset.classList.toggle(
      "active",
      Number(preset.dataset.homePercentage) === safeHomePercentage,
    );
  });

  if (shouldCalculate) {
    updateCalculator();
  }
}

function resetCalculator() {
  Object.entries(fields).forEach(([key, field]) => {
    field.value = defaults[key];
  });
  document.querySelector('input[name="car-entry-mode"][value="list"]').checked = true;
  carBrand.value = "";
  populateModels("");
  customCarBrand.value = "";
  customCarModel.value = "";
  customCarTrim.value = "";
  toggleVehicleInputMode("list");
  updateChargingMix(defaults.homePercentage, false);
  updateCalculator();
}

Object.values(fields).forEach((field) => {
  if (field !== fields.homePercentage && field !== fields.fastPercentage) {
    field.addEventListener("input", updateCalculator);
  }
});

fields.homePercentage.addEventListener("input", () => updateChargingMix(fields.homePercentage.value));

chargingPresets.forEach((preset) => {
  preset.addEventListener("click", () => updateChargingMix(preset.dataset.homePercentage));
});

Object.values(solarRangeFields).forEach((field) => {
  field.addEventListener("input", calculateSolarRange);
});

resetButton.addEventListener("click", resetCalculator);

carEntryModes.forEach((radio) => {
  radio.addEventListener("change", () => toggleVehicleInputMode(radio.value));
});

carBrand.addEventListener("change", () => populateModels(carBrand.value));
carModel.addEventListener("change", () => populateVersions(carBrand.value, carModel.value));
carTrim.addEventListener("change", selectVehicle);
[customCarBrand, customCarModel, customCarTrim].forEach((field) => {
  field.addEventListener("input", updateCustomCarName);
});

menuButton.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

mainNav.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    mainNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
populateBrands();
toggleVehicleInputMode("list");
updateChargingMix(defaults.homePercentage, false);
updateCalculator();
