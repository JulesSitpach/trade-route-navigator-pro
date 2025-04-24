
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { getTariffColor } from "@/utils/chartUtils";

interface TariffTooltipProps {
  active?: boolean;
  payload?: any[];
}

export const TariffTooltip: React.FC<TariffTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const tariffColor = getTariffColor(data.tariffRate);
    
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <div className="font-semibold text-base border-b border-gray-100 pb-2 mb-2 text-gray-800">
          {data.country}
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Tariff Rate:</span>
            <Badge 
              variant="outline" 
              className="ml-2 font-medium" 
              style={{ 
                backgroundColor: `${tariffColor}15`, 
                color: tariffColor,
                borderColor: `${tariffColor}30`
              }}
            >
              {data.tariffRate}%
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Trade Volume:</span>
            <span className="font-medium text-sm text-gray-700">
              ${Number(data.volume).toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Category:</span>
            <span className="font-medium text-sm text-gray-700">
              {data.productCategory}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
