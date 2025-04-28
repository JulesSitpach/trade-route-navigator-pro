
import { ChartLegendContent } from "@/components/ui/chart";
import { CostBreakdownItem } from "../utils/costBreakdownCalculations";
import { formatCurrency } from '@/utils/chart/formatters';
import React from 'react';
import { enhancedColors } from '@/utils/chart/enhancedColors';

interface CostBreakdownLegendProps {
  chartData: CostBreakdownItem[];
}

// Enhanced vibrant colors
const colorPalette = [
  enhancedColors.blue,     // Bright Blue
  enhancedColors.purple,   // Purple
  enhancedColors.red,      // Red
  enhancedColors.orange,   // Orange
  enhancedColors.teal,     // Teal
  enhancedColors.green,    // Green
  enhancedColors.darkOrange, // Dark Orange
  enhancedColors.darkPurple, // Dark Purple
  enhancedColors.darkBlue, // Dark Blue
  enhancedColors.turquoise  // Turquoise
];

const CostBreakdownLegend: React.FC<CostBreakdownLegendProps> = ({ chartData }) => {
  return (
    <div className="flex flex-wrap justify-center gap-5 p-3">
      {chartData.map((item, index) => (
        <div key={index} className="flex items-center">
          <div 
            className="w-4 h-4 mr-2 rounded"
            style={{ backgroundColor: item.color || colorPalette[index % colorPalette.length] }}
          />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{item.name}</span>
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500">{formatCurrency(Number(item.value))}</span>
              {item.percentage && (
                <span className="text-xs text-gray-500">({item.percentage}%)</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CostBreakdownLegend;
