
import React from 'react';

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}

const MetricCard = ({ icon, title, value }: MetricCardProps) => {
  // Format the value properly if it's a number
  const displayValue = typeof value === 'number' 
    ? title.toLowerCase().includes('cost') ? `$${value.toLocaleString()}` : value.toString()
    : value;
    
  return (
    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
      <div className="flex items-center justify-between mb-1">
        <span className="text-gray-600 text-sm">{title}</span>
        {icon}
      </div>
      <div className="font-semibold">{displayValue}</div>
    </div>
  );
};

export default MetricCard;
