
import React from 'react';
import { SupplyChainStep } from './types';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

interface SupplyChainNodeProps {
  step: SupplyChainStep;
  index: number;
  isActive: boolean;
  onClick: () => void;
  color?: string;
}

const SupplyChainNode: React.FC<SupplyChainNodeProps> = ({ 
  step, 
  index, 
  isActive, 
  onClick,
  color = '#3498DB' 
}) => {
  // Generate styles based on active state and provided color
  const nodeBaseClasses = "transition-all duration-300 ease-in-out cursor-pointer flex items-center justify-center";
  const nodeActiveClasses = isActive
    ? "w-20 h-20 border-4" 
    : "w-16 h-16 border-2 hover:scale-110";
  
  // Create box shadow style with the provided color
  const boxShadowStyle = isActive
    ? `0 0 15px ${color}99` // Softer shadow for active node
    : `0 0 10px ${color}66`; // Very subtle shadow for inactive

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={`${nodeBaseClasses} ${nodeActiveClasses} rounded-full`}
            style={{ 
              backgroundColor: color,
              borderColor: isActive ? '#FFFFFF' : `${color}`,
              boxShadow: boxShadowStyle
            }}
            onClick={onClick}
          >
            <div className="text-white text-center">
              <div className="text-sm font-bold">{index + 1}</div>
              {isActive && <div className="text-xs mt-1 font-medium">{step.label}</div>}
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium">{step.label}</p>
          <p className="text-xs text-gray-500">{step.timeframe}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SupplyChainNode;
