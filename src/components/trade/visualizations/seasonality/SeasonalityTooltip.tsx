
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface SeasonalityTooltipProps {
  active?: boolean;
  payload?: any[];
}

export const SeasonalityTooltip: React.FC<SeasonalityTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    return (
      <div className="bg-white border border-gray-200 rounded-md shadow-sm p-3 max-w-[250px]">
        <div className="font-semibold text-sm text-gray-800 mb-2 border-b border-gray-100 pb-1">
          {data.month}
        </div>
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Freight:</span>
            <Badge 
              variant="outline" 
              className="ml-2 font-medium text-xs"
              style={{ 
                backgroundColor: `${'#3b82f6'}15`, 
                color: '#3b82f6',
                borderColor: `${('#3b82f6')}30`
              }}
            >
              {data.freight}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Congestion:</span>
            <Badge 
              variant="outline" 
              className="ml-2 font-medium text-xs"
              style={{ 
                backgroundColor: `${('#f59e0b')}15`, 
                color: '#f59e0b',
                borderColor: `${('#f59e0b')}30`
              }}
            >
              {data.congestion}%
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600">Risk:</span>
            <Badge 
              variant="outline" 
              className="ml-2 font-medium text-xs"
              style={{ 
                backgroundColor: `${('#ef4444')}15`, 
                color: '#ef4444',
                borderColor: `${('#ef4444')}30`
              }}
            >
              {data.risk}%
            </Badge>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
