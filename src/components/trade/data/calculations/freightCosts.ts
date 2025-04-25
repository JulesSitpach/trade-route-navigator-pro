
interface FreightRates {
  air: {
    base: number;
    minimum: number;
  };
  sea: {
    LCL: {
      base: number;
      minimum: number;
    };
    FCL: {
      twenty: number;
      forty: number;
    };
  };
}

const baseFreightRates: FreightRates = {
  air: {
    base: 6.0,
    minimum: 600
  },
  sea: {
    LCL: {
      base: 55.0,
      minimum: 500
    },
    FCL: {
      twenty: 2200,
      forty: 3400
    }
  }
};

export const calculateFreightCost = (
  weight: number,
  productValue: number,
  transportMode: string,
  quantity: number
): number => {
  let freightCost = 0;
  
  if (transportMode === 'air') {
    freightCost = weight * baseFreightRates.air.base;
    freightCost = Math.max(freightCost, baseFreightRates.air.minimum * (productValue > 5000 ? 1.1 : 1));
  } else {
    const estimatedCBM = (weight / 1000) * 2;
    freightCost = estimatedCBM * baseFreightRates.sea.LCL.base;
    freightCost = Math.max(freightCost, baseFreightRates.sea.LCL.minimum * (productValue > 10000 ? 1.2 : 1));
  }

  const seasonalityFactor = getSeasonalityFactor();
  const bulkDiscountFactor = getBulkDiscountFactor(quantity);

  return freightCost * seasonalityFactor * bulkDiscountFactor;
};

const getSeasonalityFactor = (): number => {
  const currentMonth = new Date().getMonth();
  if (currentMonth >= 6 && currentMonth <= 8) return 1.15;
  if (currentMonth >= 11 || currentMonth <= 1) return 1.05;
  return 1;
};

const getBulkDiscountFactor = (quantity: number): number => {
  if (quantity > 50) return 0.85;
  if (quantity > 10) return 0.92;
  return 1;
};
