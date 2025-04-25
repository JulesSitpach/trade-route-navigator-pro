
const baseRates: Record<string, Record<string, number>> = {
  us: { air: 120, sea: 180, road: 150 },
  ca: { air: 140, sea: 195, road: 160 },
  mx: { air: 130, sea: 185, road: 140 },
  default: { air: 150, sea: 200, road: 170 }
};

export const calculateInlandTransportation = (
  originCountry: string,
  destinationCountry: string,
  transportMode: string,
  quantity: number,
  weight: number,
  productValue: number,
  productCategory: string
): number => {
  const countryRates = baseRates[destinationCountry.toLowerCase()] || baseRates.default;
  const baseRate = countryRates[transportMode] || 
                  (transportMode === 'air' ? countryRates.air : countryRates.sea);
  
  const distanceFactor = getDistanceFactor(originCountry, destinationCountry);
  const perUnitCost = calculatePerUnitCost(quantity);
  const weightFactor = Math.min(1 + (weight / 5000), 2.5);
  const valueFactor = getValueFactor(productValue);
  const specialHandlingFactor = productCategory === 'fragile' || 
                               productCategory === 'bulky' ? 1.25 : 1.0;
  
  let cost = baseRate + perUnitCost;
  cost *= distanceFactor * weightFactor * valueFactor * specialHandlingFactor;
  
  const maxCap = getMaxCap(destinationCountry);
  const valueScalingFactor = getValueScalingFactor(productValue);
  
  return Math.min(Math.round(cost * valueScalingFactor), maxCap);
};

const getDistanceFactor = (origin: string, destination: string): number => {
  const pair = `${origin}-${destination}`.toLowerCase();
  const distanceFactors: Record<string, number> = {
    'us-ca': 0.9,
    'ca-us': 0.9,
    'us-mx': 1.1,
    'mx-us': 1.1,
    'ca-mx': 1.3,
    'mx-ca': 1.3
  };
  return distanceFactors[pair] || 1.0;
};

const calculatePerUnitCost = (quantity: number): number => {
  if (quantity <= 5) return 60 * quantity;
  if (quantity <= 20) return 300 + ((quantity - 5) * 40);
  if (quantity <= 50) return 900 + ((quantity - 20) * 25);
  return 1650 + ((quantity - 50) * 15);
};

const getValueFactor = (productValue: number): number => {
  if (productValue < 5000) return 1.0;
  if (productValue < 25000) return 1.1;
  if (productValue < 100000) return 1.2;
  return 1.3;
};

const getMaxCap = (destinationCountry: string): number => {
  const maxCaps: Record<string, number> = {
    us: 2000,
    ca: 2200,
    mx: 1800,
    default: 2500
  };
  return maxCaps[destinationCountry.toLowerCase()] || maxCaps.default;
};

const getValueScalingFactor = (productValue: number): number => {
  if (productValue <= 1) return 0.05;
  if (productValue <= 10) return 0.15;
  if (productValue <= 50) return 0.3;
  if (productValue <= 100) return 0.5;
  if (productValue <= 500) return 0.7;
  return 1.0;
};
