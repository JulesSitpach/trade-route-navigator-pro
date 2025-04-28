
import React from 'react';
import { formatCurrency } from '@/utils/chart/formatters';

interface CostBreakdownItem {
  name: string;
  value: number;
  color: string;
  percentage?: string;
  category?: string;
}

interface CostBreakdownLegendProps {
  chartData: CostBreakdownItem[];
}

const CostBreakdownLegend: React.FC<CostBreakdownLegendProps> = ({ chartData }) => {
  return (
    <div className="flex flex-wrap justify-center gap-5 p-3 mt-4">
      {chartData.map((item, index) => (
        <div key={index} className="flex items-center">
          <div 
            className="w-4 h-4 mr-2 rounded"
            style={{ backgroundColor: item.color }}
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
