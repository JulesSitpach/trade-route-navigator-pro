
import { calculateTariff } from '@/data/countryTariffData';
import { CostItem, CostBreakdownInput } from './types/costTypes';
import { formatCurrency } from './utils/formatters';
import { calculateFreightCost } from './calculations/freightCosts';
import { calculateInlandTransportation } from './calculations/inlandTransportation';

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

  const freightCost = calculateFreightCost(
    weight,
    productValue,
    shippingData.transportMode,
    quantity
  );

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

  const inlandTransportation = calculateInlandTransportation(
    originCountry,
    destinationCountry,
    shippingData.transportMode,
    quantity,
    weight,
    productValue,
    productCategory
  );

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
