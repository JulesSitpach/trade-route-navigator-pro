
import { getCategoryColor } from '@/utils/chartUtils';

export interface CostBreakdownItem {
  name: string;
  value: number;
  category: string;
  color: string;
  percentage?: string;
}

export interface CostBreakdownInput {
  productValue: number;
  originCountry: string;
  destinationCountry: string;
  productCategory: string;
  transportMode: string;
  quantity: number;
  weight: number;
}

// Calculate the cost breakdown based on input data
export function calculateCostBreakdown(input: CostBreakdownInput, language: string = 'en'): CostBreakdownItem[] {
  const { productValue, transportMode, weight, quantity } = input;
  
  console.log("Calculating cost breakdown with inputs:", input);
  
  if (!productValue || productValue <= 0) {
    console.log("No valid product value provided, returning empty array");
    return [];
  }

  // Base calculations
  const baseFreight = calculateBaseFreight(transportMode, weight, quantity);
  const baseInsurance = productValue * 0.02; // 2% of product value
  const baseCustoms = productValue * 0.05;   // 5% of product value
  const baseHandling = baseFreight * 0.15;   // 15% of freight
  const baseDocumentation = 250;             // Fixed cost
  const baseWarehouse = quantity * 5;        // $5 per item
  
  // Apply modifiers based on countries, categories, etc.
  const freightModifier = getFreightModifier(input);
  const customsModifier = getCustomsModifier(input);
  const insuranceModifier = getInsuranceModifier(input);
  
  // Calculate final costs
  const freightCost = baseFreight * freightModifier;
  const insuranceCost = baseInsurance * insuranceModifier;
  const customsCost = baseCustoms * customsModifier;
  const handlingCost = baseHandling;
  const documentationCost = baseDocumentation;
  const warehouseCost = baseWarehouse;
  
  // Create the data array with results
  const result = [
    {
      name: language === 'en' ? 'Freight' : 'Flete',
      value: Math.round(freightCost),
      category: 'freight',
      color: getCategoryColor('freight')
    },
    {
      name: language === 'en' ? 'Insurance' : 'Seguro',
      value: Math.round(insuranceCost),
      category: 'insurance',
      color: getCategoryColor('insurance')
    },
    {
      name: language === 'en' ? 'Customs' : 'Aduanas',
      value: Math.round(customsCost),
      category: 'customs',
      color: getCategoryColor('customs')
    },
    {
      name: language === 'en' ? 'Handling' : 'Manipulación',
      value: Math.round(handlingCost),
      category: 'handling',
      color: getCategoryColor('handling')
    },
    {
      name: language === 'en' ? 'Documentation' : 'Documentación',
      value: Math.round(documentationCost),
      category: 'documentation',
      color: getCategoryColor('documentation')
    },
    {
      name: language === 'en' ? 'Warehousing' : 'Almacenaje',
      value: Math.round(warehouseCost),
      category: 'warehouse',
      color: getCategoryColor('warehouse')
    }
  ];

  console.log("Generated cost breakdown data:", result);
  
  return result;
}

// Helper functions for cost calculations
function calculateBaseFreight(transportMode: string, weight: number, quantity: number): number {
  switch (transportMode.toLowerCase()) {
    case 'air':
      return weight * 8 * quantity;
    case 'sea':
      return weight * 2 * quantity;
    case 'rail':
      return weight * 4 * quantity;
    case 'road':
      return weight * 3 * quantity;
    default:
      return weight * 5 * quantity;
  }
}

function getFreightModifier(input: CostBreakdownInput): number {
  // Apply modifiers based on countries, distances, etc.
  const { originCountry, destinationCountry, transportMode } = input;
  
  // Example logic - replace with actual business logic
  let modifier = 1.0;
  
  // Different regions have different base costs
  if (originCountry === 'China' && destinationCountry === 'USA') {
    modifier *= 1.2; // Higher costs for China-US routes
  } else if (originCountry === 'Germany' && destinationCountry === 'France') {
    modifier *= 0.8; // Lower costs for EU internal routes
  }
  
  // Transport mode affects cost further
  if (transportMode === 'air') {
    modifier *= 1.3; // Air freight is more expensive
  } else if (transportMode === 'sea') {
    modifier *= 0.9; // Sea freight is cheaper but slower
  }
  
  return modifier;
}

function getCustomsModifier(input: CostBreakdownInput): number {
  // Apply modifiers based on countries, trade agreements, etc.
  const { originCountry, destinationCountry, productCategory } = input;
  
  // Example logic - replace with actual business logic
  let modifier = 1.0;
  
  // Different countries have different customs regimes
  if (destinationCountry === 'USA') {
    modifier *= 1.1; // Higher customs costs for USA
  } else if (destinationCountry === 'Singapore') {
    modifier *= 0.7; // Lower customs costs for Singapore
  }
  
  // Product category affects duties
  if (productCategory === 'Electronics') {
    modifier *= 1.2; // Electronics often have higher import duties
  } else if (productCategory === 'Raw Materials') {
    modifier *= 0.8; // Raw materials often have lower duties
  }
  
  return modifier;
}

function getInsuranceModifier(input: CostBreakdownInput): number {
  // Apply modifiers based on transport mode, product value, etc.
  const { transportMode, productCategory } = input;
  
  // Example logic - replace with actual business logic
  let modifier = 1.0;
  
  // Transport mode affects insurance premiums
  if (transportMode === 'sea') {
    modifier *= 1.2; // Sea transport has higher risk of damage
  } else if (transportMode === 'air') {
    modifier *= 0.9; // Air transport is generally safer
  }
  
  // Product category affects insurance costs
  if (productCategory === 'Fragile Goods') {
    modifier *= 1.4; // Fragile items have higher insurance costs
  } else if (productCategory === 'Chemicals') {
    modifier *= 1.3; // Hazardous materials have higher premiums
  }
  
  return modifier;
}
