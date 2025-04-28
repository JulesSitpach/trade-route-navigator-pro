
import React from 'react';
import { PackageIcon, ShipIcon, NetworkIcon, ClipboardCheckIcon, 
         WarehouseIcon, TruckIcon, CircleDotIcon } from 'lucide-react';
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
  // Function to render the appropriate icon based on iconName
  const renderIcon = () => {
    switch(step.iconName) {
      case 'package':
        return <PackageIcon className="h-5 w-5" />;
      case 'ship':
        return <ShipIcon className="h-5 w-5" />;
      case 'network':
        return <NetworkIcon className="h-5 w-5" />;
      case 'clipboard-check':
        return <ClipboardCheckIcon className="h-5 w-5" />;
      case 'warehouse':
        return <WarehouseIcon className="h-5 w-5" />;
      case 'truck':
        return <TruckIcon className="h-5 w-5" />;
      case 'circle-dot':
        return <CircleDotIcon className="h-5 w-5" />;
      default:
        return <CircleDotIcon className="h-5 w-5" />;
    }
  };

  return (
    <div 
      className={`flex flex-col items-center cursor-pointer transition-all ${isActive ? 'scale-110' : 'hover:scale-105'}`}
      onClick={onClick}
    >
      <div 
        className={`w-12 h-12 rounded-full flex items-center justify-center 
                   ${isActive 
                     ? 'bg-blue-500 text-white border-2 border-blue-600' 
                     : 'bg-white border border-blue-300 text-blue-500'} 
                   shadow-sm transition-all`}
      >
        {renderIcon()}
      </div>
      <div className="mt-2 text-[10px] sm:text-xs text-center">
        <span className="inline-block bg-white px-1 rounded text-gray-700 whitespace-nowrap">
          {index + 1}. {step.label}
        </span>
      </div>
    </div>
  );
};

export default SupplyChainNode;
