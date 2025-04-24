
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface RouteComparisonTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export const RouteComparisonTooltip: React.FC<RouteComparisonTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }
  
  const data = payload[0]?.payload;
  const total = payload.reduce((sum, entry) => sum + entry.value, 0);
  
  return (
    <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-md shadow-sm p-3 max-w-[250px]">
      <div className="font-semibold text-sm text-gray-800 mb-2 border-b border-gray-100 pb-1">
        {data?.fullRoute || label}
      </div>
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex justify-between items-center">
            <span className="text-xs text-gray-600">{entry.name}:</span>
            <Badge 
              variant="outline" 
              className="ml-2 font-medium text-xs"
              style={{ 
                backgroundColor: `${entry.fill}15`, 
                color: entry.fill,
                borderColor: `${entry.fill}30`
              }}
            >
              {entry.value} days
            </Badge>
          </div>
        ))}
        <div className="flex justify-between items-center mt-1 pt-1 border-t border-gray-100">
          <span className="text-xs font-medium text-gray-700">Total:</span>
          <Badge variant="outline" className="ml-2 font-medium text-xs bg-gray-50">
            {total} days
          </Badge>
        </div>
      </div>
    </div>
  );
};
