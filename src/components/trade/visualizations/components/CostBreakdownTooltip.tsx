
import { formatCurrency } from '../../../trade/data/utils/formatters';
import { tooltipStyles } from '@/components/ui/chart/theme/commonStyles';
import React from 'react';

const CostBreakdownTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) {
    return null;
  }
  
  const data = payload[0];
  return (
    <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md" style={{
      backgroundColor: '#FFFFFF',
      border: '1px solid #BDC3C7',
      borderRadius: '6px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      padding: '10px 12px',
      minWidth: '160px',
    }}>
      <div className="text-sm font-medium mb-1">{data.name}</div>
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-sm">Value:</span> 
        <span className="text-sm font-semibold">{formatCurrency(Number(data.value))}</span>
      </div>
      {data.payload && data.payload.percentage && (
        <div className="flex items-center justify-between mt-1">
          <span className="text-muted-foreground text-sm">Percentage:</span>
          <span className="text-sm font-semibold">{data.payload.percentage}%</span>
        </div>
      )}
    </div>
  );
};

export default CostBreakdownTooltip;
