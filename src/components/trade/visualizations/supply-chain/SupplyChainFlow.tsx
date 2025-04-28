
import React from 'react';
import { SupplyChainStep } from './types';
import SupplyChainNode from './SupplyChainNode';
import SupplyChainDetailPanel from './SupplyChainDetailPanel';
import SupplyChainLegend from './SupplyChainLegend';

interface SupplyChainFlowProps {
  steps: SupplyChainStep[];
  activeStep: number | null;
  setActiveStep: (index: number | null) => void;
  language: string;
}

const SupplyChainFlow: React.FC<SupplyChainFlowProps> = ({ 
  steps, 
  activeStep, 
  setActiveStep,
  language
}) => {
  return (
    <div className="h-[400px] flex flex-col items-center justify-center border rounded-lg bg-gray-50 overflow-x-auto">
      <div className="min-w-[800px] w-full px-4 py-8">
        {/* Supply chain flow visualization */}
        <div className="flex justify-between items-center relative">
          {/* Connection lines with directional flow */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-100 to-blue-300 -z-10"></div>
          
          {/* Directional arrows */}
          {steps.slice(0, -1).map((_, index) => (
            <div key={`arrow-${index}`} className="absolute" style={{ left: `${(index + 1) * (100 / steps.length) - 1.5}%`, top: 'calc(50% - 6px)' }}>
              <div className="w-3 h-3 border-t-2 border-r-2 border-blue-400 transform rotate-45"></div>
            </div>
          ))}
          
          {/* Nodes */}
          {steps.map((step, index) => (
            <SupplyChainNode
              key={step.id}
              step={step}
              index={index}
              isActive={activeStep === index}
              onClick={() => setActiveStep(activeStep === index ? null : index)}
            />
          ))}
        </div>
        
        {/* Details panel for active step */}
        {activeStep !== null && (
          <SupplyChainDetailPanel step={steps[activeStep]} language={language} />
        )}
        
        {/* Legend */}
        {activeStep === null && (
          <SupplyChainLegend steps={steps} language={language} />
        )}
      </div>
    </div>
  );
};

export default SupplyChainFlow;
