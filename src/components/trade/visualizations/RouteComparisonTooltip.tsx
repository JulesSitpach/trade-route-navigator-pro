
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { tooltipStyles } from "@/components/ui/chart/theme/commonStyles";

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
    <div style={{
      ...tooltipStyles.wrapper,
      // Ensuring consistent styles with explicit overrides
      backgroundColor: '#FFFFFF', 
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      border: '1px solid rgba(229, 231, 235, 1)',
    }}>
      <div style={tooltipStyles.title}>
        {data?.fullRoute || label}
      </div>
      <div className="space-y-1" style={tooltipStyles.content}>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} style={tooltipStyles.row}>
            <span>{entry.name}:</span>
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
        <div style={{ ...tooltipStyles.row, marginTop: '8px', borderTop: '1px solid #f3f4f6', paddingTop: '8px' }}>
          <span className="font-medium">Total:</span>
          <Badge variant="outline" className="ml-2 font-medium text-xs bg-gray-50">
            {total} days
          </Badge>
        </div>
      </div>
    </div>
  );
};
