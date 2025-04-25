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

  const baseFreightRate = {
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

  let freightCost = 0;
  if (shippingData.transportMode === 'air') {
    freightCost = weight * baseFreightRate.air.base;
    freightCost = Math.max(freightCost, baseFreightRate.air.minimum);
  } else {
    const estimatedCBM = (weight / 1000) * 2;
    freightCost = estimatedCBM * baseFreightRate.sea.LCL.base;
    freightCost = Math.max(freightCost, baseFreightRate.sea.LCL.minimum);
  }

  if (quantity > 10) {
    freightCost *= 0.95;
  }
  if (quantity > 50) {
    freightCost *= 0.90;
  }

  const currentMonth = new Date().getMonth();
  if (currentMonth >= 6 && currentMonth <= 8) {
    freightCost *= 1.15;
  }

  if (productValue > 5000) {
    freightCost *= 1.1;
  }

  const importDuty = (productValue * importDutyRate) / 100;
  const insuranceRate = 1.5;
  const insurance = Math.max((productValue * insuranceRate) / 100, 50);

  const documentationFees = shippingData.transportMode === 'air' 
    ? 95
    : 125;

  const customsClearance = Math.max(175, productValue * 0.01);

  const inlandBaseRate = shippingData.transportMode === 'air' ? 150 : 200;
  const inlandPerUnit = Math.min(50 * quantity, 500);
  const inlandTransportation = Math.min(inlandBaseRate + inlandPerUnit, 1500);

  const warehouseDailyRate = shippingData.transportMode === 'air' ? 2 : 4;
  const estimatedDays = shippingData.transportMode === 'air' ? 3 : 7;
  const warehouseBaseCharge = 100;
  const warehouseCostRaw = warehouseBaseCharge + (warehouseDailyRate * estimatedDays * quantity);
  const warehousingCost = Math.min(warehouseCostRaw, 2000);

  const otherFeesRate = 2.0;
  const otherFees = (productValue * otherFeesRate) / 100;

  return [
    { label: "Product Value", value: formatCurrency(productValue) },
    { label: `Import Duty (${importDutyRate}%)`, value: formatCurrency(importDuty) },
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
