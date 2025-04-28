
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { SupplyChainStep } from './types';

interface SupplyChainNodeProps {
  step: SupplyChainStep;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

const SupplyChainNode: React.FC<SupplyChainNodeProps> = ({ 
  step, 
  index, 
  isActive, 
  onClick 
}) => {
  const Icon = step.icon;
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`w-14 h-14 rounded-full ${isActive ? 'bg-blue-100 border-2 border-blue-500' : 'bg-blue-50 border border-blue-300'} flex items-center justify-center mb-2 z-10 cursor-pointer transition-all hover:bg-blue-200`}
        onClick={onClick}
      >
        <div className="flex flex-col items-center justify-center">
          {React.cloneElement(Icon, { className: `h-5 w-5 ${isActive ? 'text-blue-700' : 'text-blue-500'}` })}
          <span className={`text-xs mt-0.5 ${isActive ? 'font-medium text-blue-700' : 'text-blue-500'}`}>{index + 1}</span>
        </div>
      </div>
      <span className="text-xs font-medium text-center max-w-[80px]">
        {step.label}
      </span>
      <span className="text-xs text-gray-500 mt-1">
        {step.timeframe}
      </span>
    </div>
  );
};

export default SupplyChainNode;
