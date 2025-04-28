
import { ChartLegendContent } from "@/components/ui/chart";
import { CostBreakdownItem } from "../utils/costBreakdownCalculations";
import { formatCurrency } from '../../../trade/data/utils/formatters';
import React from 'react';

interface CostBreakdownLegendProps {
  chartData: CostBreakdownItem[];
}

const CostBreakdownLegend: React.FC<CostBreakdownLegendProps> = ({ chartData }) => {
  // Custom formatter function to be used inside the component
  const formatLegendItem = (value: any, entry: any) => {
    const item = chartData.find(item => item.name === entry?.payload?.name);
    return [
      formatCurrency(Number(item?.value || 0)),
      item?.name || ''
    ];
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 p-2">
      {chartData.map((item, index) => (
        <div key={index} className="flex items-center">
          <div 
            className="w-3 h-3 mr-2 rounded-sm" 
            style={{ backgroundColor: item.color }}
          />
          <span className="text-sm font-medium">{item.name}: {formatCurrency(Number(item.value))}</span>
        </div>
      ))}
    </div>
  );
};

export default CostBreakdownLegend;
