
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
  const weight = parseFloat(shippingData.weight) || 100; // Default to 100kg if weight is 0
  
  // Industry standard freight rates for SMB shipments
  const baseFreightRate = {
    air: {
      base: 6.0, // USD per kg for air freight (standard rate for NA routes)
      minimum: 600 // Minimum cost for air shipment
    },
    sea: {
      LCL: {
        base: 55.0, // USD per cbm for LCL
        minimum: 500 // Minimum cost for LCL shipment
      },
      FCL: {
        twenty: 2200, // Base rate for 20ft container
        forty: 3400,  // Base rate for 40ft container
      }
    }
  };

  // Calculate freight cost based on mode and volume
  let freightCost = 0;
  if (shippingData.transportMode === 'air') {
    // Air freight calculation
    freightCost = weight * baseFreightRate.air.base;
    freightCost = Math.max(freightCost, baseFreightRate.air.minimum);
  } else {
    // Sea freight calculation - assuming LCL for SMB
    const estimatedCBM = (weight / 1000) * 2; // Rough CBM estimation
    freightCost = estimatedCBM * baseFreightRate.sea.LCL.base;
    freightCost = Math.max(freightCost, baseFreightRate.sea.LCL.minimum);
  }

  // Volume-based discounts
  if (quantity > 10) {
    freightCost *= 0.95; // 5% discount for medium volume
  }
  if (quantity > 50) {
    freightCost *= 0.90; // Additional 10% discount for large volume
  }

  // Peak season surcharge (example: 15% during peak months)
  const currentMonth = new Date().getMonth();
  if (currentMonth >= 6 && currentMonth <= 8) { // Peak season July-September
    freightCost *= 1.15;
  }

  // Value-based additional costs
  if (productValue > 5000) {
    freightCost *= 1.1; // 10% surcharge for high-value shipments
  }

  // Calculate other costs with realistic rates
  const importDuty = (productValue * importDutyRate) / 100;
  const insuranceRate = 1.5; // Standard 1.5% of value
  const insurance = Math.max((productValue * insuranceRate) / 100, 50); // Minimum $50
  
  const documentationFees = shippingData.transportMode === 'air' 
    ? 95  // Air freight documentation
    : 125; // Ocean freight documentation (more complex)
    
  const customsClearance = Math.max(175, productValue * 0.01); // Greater of $175 or 1% of value
  
  // Inland transportation based on mode and distance
  const inlandTransportation = shippingData.transportMode === 'air'
    ? Math.max(200 * quantity, 150) // Air freight local delivery
    : Math.max(250 * quantity, 200); // Ocean freight local delivery (usually higher)
    
  // Warehousing costs - different for air vs ocean
  const warehousingCost = shippingData.transportMode === 'air'
    ? Math.max(50 * quantity, productValue * 0.01) // Minimal for air freight
    : Math.max(180 * quantity, productValue * 0.015); // Higher for ocean freight
    
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
