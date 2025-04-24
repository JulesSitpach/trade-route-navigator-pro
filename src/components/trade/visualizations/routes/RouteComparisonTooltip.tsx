
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface RouteComparisonTooltipProps {
  active?: boolean;
  payload?: any[];
}

export const RouteComparisonTooltip: React.FC<RouteComparisonTooltipProps> = ({ active, payload }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const data = payload[0].payload;
  
  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3 max-w-[250px]">
      <div className="font-semibold text-sm text-gray-800 mb-2 border-b border-gray-100 pb-1">
        {data.name}
      </div>
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Shipping:</span>
          <Badge 
            variant="outline" 
            className="ml-2 font-medium text-xs"
            style={{ 
              backgroundColor: `${('#3b82f6')}15`, 
              color: '#3b82f6',
              borderColor: `${('#3b82f6')}30`
            }}
          >
            {data.shipping} days
          </Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Customs:</span>
          <Badge 
            variant="outline" 
            className="ml-2 font-medium text-xs"
            style={{ 
              backgroundColor: `${('#f59e0b')}15`, 
              color: '#f59e0b',
              borderColor: `${('#f59e0b')}30`
            }}
          >
            {data.customs} days
          </Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600">Distribution:</span>
          <Badge 
            variant="outline" 
            className="ml-2 font-medium text-xs"
            style={{ 
              backgroundColor: `${('#10b981')}15`, 
              color: '#10b981',
              borderColor: `${('#10b981')}30`
            }}
          >
            {data.distribution} days
          </Badge>
        </div>
      </div>
    </div>
  );
};
