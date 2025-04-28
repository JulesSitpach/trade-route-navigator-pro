
import { ChartLegendContent } from "@/components/ui/chart";
import { CostBreakdownItem } from "../utils/costBreakdownCalculations";
import { formatCurrency } from '../../../trade/data/utils/formatters';
import React from 'react';

interface CostBreakdownLegendProps {
  chartData: CostBreakdownItem[];
}

const CostBreakdownLegend: React.FC<CostBreakdownLegendProps> = ({ chartData }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-2">
      {chartData.map((item, index) => (
        <div key={index} className="flex items-center">
          <div 
            className="w-3 h-3 mr-2 rounded-sm" 
            style={{ backgroundColor: item.color || getCategoryColor(item.category) }}
          />
          <span className="text-sm font-medium">{item.name}: {formatCurrency(Number(item.value))}</span>
        </div>
      ))}
    </div>
  );
};

// Utility function to get color based on category if color is not provided
function getCategoryColor(category: string): string {
  switch(category) {
    case 'freight':
      return '#E74C3C';  // Error Red - Freight/Shipping
    case 'insurance':
      return '#27AE60';  // Success Green - Insurance
    case 'customs':
      return '#9B59B6';  // Purple - Customs/Regulatory
    case 'handling':
      return '#16A085';  // Dark Teal - Transportation
    case 'documentation':
      return '#F39C12';  // Warning Amber - Documentation
    case 'warehouse':
      return '#D35400';  // Dark Orange - Warehousing
    case 'lastMile':
      return '#16A085';  // Dark Teal - Transportation
    case 'compliance':
      return '#8E44AD';  // Dark Purple - Taxes/Fees
    case 'risk':
      return '#E74C3C';  // Error Red
    default:
      return '#3498DB';  // Default blue
  }
}

export default CostBreakdownLegend;
