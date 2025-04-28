
import { ChartLegendContent } from "@/components/ui/chart";
import { CostBreakdownItem } from "../utils/costBreakdownCalculations";
import { formatCurrency } from '../../../trade/data/utils/formatters';
import React from 'react';

interface CostBreakdownLegendProps {
  chartData: CostBreakdownItem[];
}

// Enhanced vibrant colors
const colorPalette = [
  "#3498DB", // Bright Blue
  "#9B59B6", // Purple
  "#E74C3C", // Red
  "#F39C12", // Orange
  "#16A085", // Teal
  "#27AE60", // Green
  "#D35400", // Dark Orange
  "#8E44AD", // Dark Purple
  "#2980B9", // Dark Blue
  "#1ABC9C"  // Turquoise
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
