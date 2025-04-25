
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
  const weight = parseFloat(shippingData.weight) || 10; // Default to 10kg if weight is 0
  
  // More realistic freight rates based on industry standards
  const baseFreightRate = {
    air: {
      base: 15.0, // USD per kg for air freight
      minimum: 250 // Minimum cost for air shipment
    },
    sea: {
      base: 5.5, // USD per kg for sea freight
      minimum: 500  // Minimum cost for sea shipment
    }
  };

  // Calculate base freight cost
  let freightCost = weight * 
    (shippingData.transportMode === 'air' ? baseFreightRate.air.base : baseFreightRate.sea.base) * 
    quantity;

  // Apply minimum freight costs - realistic minimums for SMB international shipments
  freightCost = Math.max(
    freightCost, 
    shippingData.transportMode === 'air' ? baseFreightRate.air.minimum : baseFreightRate.sea.minimum
  );

  // Volume-based discounts for larger quantities
  if (quantity > 5) {
    freightCost *= 0.92; // 8% discount for bulk shipping
  }
  if (quantity > 20) {
    freightCost *= 0.95; // Additional 5% discount for larger volumes
  }

  // Value-based additional costs
  if (productValue > 1000) {
    freightCost += (productValue * 0.012); // 1.2% surcharge for valuable items
  }
  
  // Additional distance-based costs if applicable
  if (shippingData.transportMode === 'sea') {
    // Add a buffer for longer sea routes
    freightCost *= 1.15;
  }

  // Calculate other costs with more realistic rates
  const importDuty = (productValue * importDutyRate) / 100;
  const insuranceRate = 1.5; // 1.5% of value
  const insurance = Math.max((productValue * insuranceRate) / 100, 50); // 1.5% of value or minimum $50
  const documentationFees = Math.max(95 * (shippingData.transportMode === 'air' ? 1.2 : 1), 75);
  const customsClearance = Math.max(175, productValue * 0.01); // Greater of $175 or 1% of value
  const inlandTransportation = Math.max(250 * quantity, 150); // Minimum $150
  const warehousingCost = Math.max(180 * quantity, productValue * 0.015); // Greater of $180/unit or 1.5% of value
  const otherFeesRate = 2.0; // 2% for miscellaneous fees
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
