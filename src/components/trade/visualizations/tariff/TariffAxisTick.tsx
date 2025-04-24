
import React from 'react';

interface TariffAxisTickProps {
  x: number;
  y: number;
  payload: {
    value: string;
  };
}

export const TariffAxisTick: React.FC<TariffAxisTickProps> = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text 
        x={0} 
        y={0} 
        dy={16} 
        dx={-15}
        textAnchor="end" 
        fill="#64748b"
        fontSize={12}
        transform="rotate(-45)"
      >
        {payload.value}
      </text>
    </g>
  );
};
