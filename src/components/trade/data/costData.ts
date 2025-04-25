
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
}

const formatCurrency = (value: number): string => {
  return `$${value.toLocaleString(undefined, { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
};

export const generateCostItems = ({
  productValue,
  importDutyRate = 8.5,
  shippingData = {
    quantity: '1',
    weight: '0',
    transportMode: 'sea'
  }
}: CostBreakdownInput & { shippingData?: { quantity: string; weight: string; transportMode: string } }): CostItem[] => {
  const quantity = parseInt(shippingData.quantity) || 1;
  const weight = parseFloat(shippingData.weight) || 0;
  const baseFreightRate = shippingData.transportMode === 'air' ? 8.5 : 2.5; // USD per kg
  
  const importDuty = (productValue * importDutyRate) / 100;
  const freightCost = weight * baseFreightRate * quantity;
  const insurance = (productValue * 1.2) / 100; // 1.2% of product value
  const documentationFees = 75 * (shippingData.transportMode === 'air' ? 1.5 : 1);
  const customsClearance = 150;
  const inlandTransportation = 300 * quantity;
  const warehousingCost = 200 * quantity;
  const otherFees = (productValue * 1.8) / 100;

  return [
    { label: "Product Value", value: formatCurrency(productValue) },
    { label: `Import Duty (${importDutyRate}%)`, value: formatCurrency(importDuty) },
    { label: "Freight Cost", value: formatCurrency(freightCost) },
    { label: "Insurance (1.2%)", value: formatCurrency(insurance) },
    { label: "Documentation Fees", value: formatCurrency(documentationFees) },
    { label: "Customs Clearance", value: formatCurrency(customsClearance) },
    { label: "Inland Transportation", value: formatCurrency(inlandTransportation) },
    { label: "Warehousing", value: formatCurrency(warehousingCost) },
    { label: "Other Taxes and Fees", value: formatCurrency(otherFees) }
  ];
};

// Default cost items using the generate function
export const defaultCostItems = generateCostItems({
  productValue: 10000
});

export const calculateTotalCost = (items: Array<{ value: string }>) => {
  return items.reduce((sum, item) => {
    const value = parseFloat(item.value.replace(/[$,]/g, '')) || 0;
    return sum + value;
  }, 0);
};

