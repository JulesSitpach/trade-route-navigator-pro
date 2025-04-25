
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
  
  // Modified calculation for per unit cost - reduced for air transport
  const perUnitCost = calculatePerUnitCost(quantity, transportMode);
  
  // Modified weight factor - reduced impact for air transport
  const weightFactor = transportMode === 'air' 
    ? Math.min(1 + (weight / 10000), 1.75) 
    : Math.min(1 + (weight / 5000), 2.5);
    
  const valueFactor = getValueFactor(productValue);
  const specialHandlingFactor = productCategory === 'fragile' || 
                               productCategory === 'bulky' ? 1.25 : 1.0;
  
  let cost = baseRate + perUnitCost;
  cost *= distanceFactor * weightFactor * valueFactor * specialHandlingFactor;
  
  // Apply air discount factor
  if (transportMode === 'air') {
    cost *= 0.85; // 15% discount for air transport inland costs
  }
  
  const maxCap = getMaxCap(destinationCountry, transportMode);
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

// Modified to reduce costs for air transport
const calculatePerUnitCost = (quantity: number, transportMode: string): number => {
  const airFactor = transportMode === 'air' ? 0.7 : 1.0;
  
  if (quantity <= 5) return 60 * quantity * airFactor;
  if (quantity <= 20) return (300 + ((quantity - 5) * 40)) * airFactor;
  if (quantity <= 50) return (900 + ((quantity - 20) * 25)) * airFactor;
  return (1650 + ((quantity - 50) * 15)) * airFactor;
};

const getValueFactor = (productValue: number): number => {
  if (productValue < 5000) return 1.0;
  if (productValue < 25000) return 1.1;
  if (productValue < 100000) return 1.2;
  return 1.3;
};

// Modified to provide lower maxCap for air transport
const getMaxCap = (destinationCountry: string, transportMode: string): number => {
  const maxCaps: Record<string, number> = {
    us: transportMode === 'air' ? 1500 : 2000,
    ca: transportMode === 'air' ? 1700 : 2200,
    mx: transportMode === 'air' ? 1400 : 1800,
    default: transportMode === 'air' ? 1800 : 2500
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
