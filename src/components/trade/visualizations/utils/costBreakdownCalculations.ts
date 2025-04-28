
import { calculateTariff } from '@/data/countryTariffData';
import { calculateFreightCost } from '../../data/calculations/freightCosts';
import { calculateInlandTransportation } from '../../data/calculations/inlandTransportation';

export interface CostBreakdownInput {
  productValue: number;
  originCountry: string;
  destinationCountry: string;
  productCategory: string;
  transportMode: string;
  quantity: number;
  weight: number;
}

export interface CostBreakdownItem {
  name: string;
  value: number;
  category: string;
}

export const calculateCostBreakdown = (
  props: CostBreakdownInput,
  language: string = 'en'
): CostBreakdownItem[] => {
  const {
    productValue,
    originCountry,
    destinationCountry,
    productCategory,
    transportMode,
    quantity,
    weight
  } = props;

  const totalProductValue = productValue * quantity;
  const importDutyRate = calculateTariff(originCountry, destinationCountry, productCategory);
  const importDuty = (totalProductValue * importDutyRate) / 100;
  
  const freightCost = calculateFreightCost(weight, productValue, transportMode, quantity);
  
  const insuranceRate = 1.5;
  const insuranceRateAdjustment = totalProductValue > 10000 ? 1.2 : 1;
  const insurance = Math.max((totalProductValue * insuranceRate * insuranceRateAdjustment) / 100, 50);
  
  const documentationFees = transportMode === 'air' ? 95 : 125;
  
  const customsClearance = Math.max(175, totalProductValue * 0.01) * (totalProductValue > 50000 ? 1.2 : 1);
  
  const inlandTransportation = calculateInlandTransportation(
    originCountry,
    destinationCountry,
    transportMode,
    quantity,
    weight,
    totalProductValue,
    productCategory
  );
  
  // Warehouse cost calculation
  const warehouseDailyRate = transportMode === 'air' ? 1.5 : 4;
  const estimatedDays = transportMode === 'air' ? 2 : 7;
  const warehouseBaseCharge = transportMode === 'air' ? 75 : 100;
  const quantityFactor = Math.min(Math.sqrt(quantity) * 1.2, quantity * 0.3);
  
  const highValueAdjustment = totalProductValue > 20000 ? 1.15 : 1;
  const warehouseCostRaw = warehouseBaseCharge + 
    (warehouseDailyRate * estimatedDays * quantityFactor) * highValueAdjustment;
    
  const transportModeStr = String(transportMode);
  const warehouseCost = Math.min(warehouseCostRaw, transportModeStr === 'air' ? 800 : 2000);
  
  const otherFeesRate = totalProductValue > 15000 ? 2.5 : 2.0;
  const otherFees = (totalProductValue * otherFeesRate) / 100;

  return [
    {
      name: language === 'es' ? 'Arancel de Importación' : 'Import Duty',
      value: importDuty,
      category: 'importDuty'
    },
    {
      name: language === 'es' ? 'Costo de Flete' : 'Freight Cost',
      value: freightCost,
      category: 'freight'
    },
    {
      name: language === 'es' ? 'Seguro' : 'Insurance',
      value: insurance,
      category: 'insurance'
    },
    {
      name: language === 'es' ? 'Tarifas de Documentación' : 'Documentation Fees',
      value: documentationFees,
      category: 'documentation'
    },
    {
      name: language === 'es' ? 'Despacho Aduanero' : 'Customs Clearance',
      value: customsClearance,
      category: 'customs'
    },
    {
      name: language === 'es' ? 'Transporte Terrestre' : 'Inland Transportation',
      value: inlandTransportation,
      category: 'shipping'
    },
    {
      name: language === 'es' ? 'Almacenaje' : 'Warehousing',
      value: warehouseCost,
      category: 'warehousing'
    },
    {
      name: language === 'es' ? 'Otros Impuestos y Tarifas' : 'Other Taxes and Fees',
      value: otherFees,
      category: 'customs'
    }
  ].filter(item => item.value > 0);
};
