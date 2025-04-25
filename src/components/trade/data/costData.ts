
import { calculateTariff } from '@/data/countryTariffData';

interface CostItem {
  label: string;
  value: string;
}

interface CostBreakdownInput {
  productValue: number;
  importDutyRate?: number;
  freightCost?: number;
  insuranceRate?: number;
  documentationFees?: number;
  customsClearance?: number;
  inlandTransportation?: number;
  warehousingCost?: number;
  otherFeesRate?: number;
  originCountry?: string;
  destinationCountry?: string;
  productCategory?: string;
}

const formatCurrency = (value: number): string => {
  return `$${value.toLocaleString(undefined, { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
};

export const generateCostItems = ({
  productValue,
  originCountry = 'us',
  destinationCountry = 'us',
  productCategory = 'general',
  shippingData = {
    quantity: '1',
    weight: '0',
    transportMode: 'sea'
  }
}: CostBreakdownInput & { shippingData?: { quantity: string; weight: string; transportMode: string } }): CostItem[] => {
  const importDutyRate = calculateTariff(originCountry, destinationCountry, productCategory);
  
  const quantity = parseInt(shippingData.quantity) || 1;
  const weight = parseFloat(shippingData.weight) || 100;

  const baseFreightRates = {
    air: {
      base: 6.0 * (weight / 100),
      minimum: 600 * (productValue > 5000 ? 1.1 : 1)
    },
    sea: {
      LCL: {
        base: 55.0 * (weight / 1000),
        minimum: 500 * (productValue > 10000 ? 1.2 : 1)
      },
      FCL: {
        twenty: 2200 * (quantity > 10 ? 0.95 : 1),
        forty: 3400 * (quantity > 10 ? 0.95 : 1)
      }
    }
  };

  let freightCost = 0;
  if (shippingData.transportMode === 'air') {
    freightCost = weight * baseFreightRates.air.base;
    freightCost = Math.max(freightCost, baseFreightRates.air.minimum);
  } else {
    const estimatedCBM = (weight / 1000) * 2;
    freightCost = estimatedCBM * baseFreightRates.sea.LCL.base;
    freightCost = Math.max(freightCost, baseFreightRates.sea.LCL.minimum);
  }

  const seasonalityFactor = (() => {
    const currentMonth = new Date().getMonth();
    if (currentMonth >= 6 && currentMonth <= 8) return 1.15;
    if (currentMonth >= 11 || currentMonth <= 1) return 1.05;
    return 1;
  })();

  const bulkDiscountFactor = (() => {
    if (quantity > 50) return 0.85;
    if (quantity > 10) return 0.92;
    return 1;
  })();

  freightCost *= seasonalityFactor * bulkDiscountFactor;

  const insuranceRate = 1.5;
  const insuranceRateAdjustment = productValue > 10000 ? 1.2 : 1;
  const insurance = Math.max(
    (productValue * insuranceRate * insuranceRateAdjustment) / 100,
    50
  );

  const documentationFees = (() => {
    const baseFee = shippingData.transportMode === 'air' ? 95 : 125;
    return baseFee * (productValue > 5000 ? 1.1 : 1);
  })();

  const customsClearance = (() => {
    const baseMinimum = 175;
    const valuePercentage = productValue * 0.01;
    const progressiveFactor = productValue > 50000 ? 1.2 : 1;
    return Math.max(baseMinimum, valuePercentage) * progressiveFactor;
  })();

  // Updated dynamic calculation for inland transportation
  const calculateInlandTransportation = () => {
    // Base rates vary by transport mode and destination country
    const baseRates: Record<string, Record<string, number>> = {
      us: { air: 120, sea: 180, road: 150 },
      ca: { air: 140, sea: 195, road: 160 },
      mx: { air: 130, sea: 185, road: 140 },
      default: { air: 150, sea: 200, road: 170 }
    };
    
    // Get base rate for destination and transport mode
    const countryRates = baseRates[destinationCountry.toLowerCase()] || baseRates.default;
    const baseRate = countryRates[shippingData.transportMode] || 
                    (shippingData.transportMode === 'air' ? countryRates.air : countryRates.sea);
    
    // Distance factor - simulated based on origin/destination pair
    // In a real system, this would use actual distance calculations
    const distanceFactor = (() => {
      const pair = `${originCountry}-${destinationCountry}`.toLowerCase();
      const distanceFactors: Record<string, number> = {
        'us-ca': 0.9,
        'ca-us': 0.9,
        'us-mx': 1.1,
        'mx-us': 1.1,
        'ca-mx': 1.3,
        'mx-ca': 1.3
      };
      return distanceFactors[pair] || 1.0;
    })();
    
    // Calculate per unit costs with diminishing returns for higher quantities
    const perUnitCost = (() => {
      if (quantity <= 5) return 60 * quantity;
      if (quantity <= 20) return 300 + ((quantity - 5) * 40);
      if (quantity <= 50) return 900 + ((quantity - 20) * 25);
      return 1650 + ((quantity - 50) * 15);
    })();
    
    // Weight factor - heavier shipments cost more per distance
    const weightFactor = Math.min(1 + (weight / 5000), 2.5);
    
    // Value factor - higher value goods have higher transport insurance costs built in
    const valueFactor = (() => {
      if (productValue < 5000) return 1.0;
      if (productValue < 25000) return 1.1;
      if (productValue < 100000) return 1.2;
      return 1.3;
    })();
    
    // Special handling for bulky or fragile items
    const specialHandlingFactor = productCategory === 'fragile' || 
                                 productCategory === 'bulky' ? 1.25 : 1.0;
    
    // Calculate final cost with all factors
    let cost = baseRate + perUnitCost;
    cost *= distanceFactor * weightFactor * valueFactor * specialHandlingFactor;
    
    // Apply maximum cap based on destination
    const maxCaps: Record<string, number> = {
      us: 2000,
      ca: 2200,
      mx: 1800,
      default: 2500
    };
    const maxCap = maxCaps[destinationCountry.toLowerCase()] || maxCaps.default;
    
    return Math.min(Math.round(cost), maxCap);
  };

  const inlandTransportation = calculateInlandTransportation();

  const warehouseDailyRate = shippingData.transportMode === 'air' ? 2 : 4;
  const estimatedDays = shippingData.transportMode === 'air' ? 3 : 7;
  const warehouseBaseCharge = 100;
  const warehouseCostRaw = warehouseBaseCharge + 
    (warehouseDailyRate * estimatedDays * quantity) * 
    (productValue > 20000 ? 1.15 : 1);
  const warehousingCost = Math.min(warehouseCostRaw, 2000);

  const otherFeesRate = productValue > 15000 ? 2.5 : 2.0;
  const otherFees = (productValue * otherFeesRate) / 100;

  return [
    { label: "Product Value", value: formatCurrency(productValue) },
    { label: `Import Duty (${importDutyRate}%)`, value: formatCurrency((productValue * importDutyRate) / 100) },
    { label: "Freight Cost", value: formatCurrency(freightCost) },
    { label: `Insurance (${insuranceRate}%)`, value: formatCurrency(insurance) },
    { label: "Documentation Fees", value: formatCurrency(documentationFees) },
    { label: "Customs Clearance", value: formatCurrency(customsClearance) },
    { label: "Inland Transportation", value: formatCurrency(inlandTransportation) },
    { label: "Warehousing", value: formatCurrency(warehousingCost) },
    { label: `Other Taxes and Fees (${otherFeesRate}%)`, value: formatCurrency(otherFees) }
  ];
};

export const calculateTotalCost = (items: Array<{ value: string }>) => {
  return items.reduce((sum, item) => {
    const value = parseFloat(item.value.replace(/[$,]/g, '')) || 0;
    return sum + value;
  }, 0);
};
