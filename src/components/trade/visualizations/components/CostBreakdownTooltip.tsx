
import { formatCurrency } from '../../../trade/data/utils/formatters';
import React from 'react';

const CostBreakdownTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload.length) {
    return null;
  }
  
  const data = payload[0];
  return (
    <div className="bg-white p-3 border border-gray-200 shadow-lg rounded-md" style={{
      backgroundColor: '#FFFFFF',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      padding: '12px 16px',
      minWidth: '180px',
    }}>
      <div className="text-sm font-semibold mb-2 pb-1 border-b border-gray-100" style={{
        color: data.payload?.color || data.fill || '#333',
        borderColor: `${data.payload?.color || data.fill || '#e2e8f0'}30`,
      }}>
        {data.name}
      </div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-gray-600 text-sm">Value:</span> 
        <span className="text-sm font-semibold text-gray-800">{formatCurrency(Number(data.value))}</span>
      </div>
      {data.payload && data.payload.percentage && (
        <div className="flex items-center justify-between">
          <span className="text-gray-600 text-sm">Percentage:</span>
          <span className="text-sm font-semibold text-gray-800">{data.payload.percentage}%</span>
        </div>
      )}
    </div>
  );
};

export default CostBreakdownTooltip;
