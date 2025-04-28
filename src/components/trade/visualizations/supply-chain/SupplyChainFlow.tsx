
import React from 'react';
import { SupplyChainStep } from './types';
import SupplyChainNode from './SupplyChainNode';
import SupplyChainDetailPanel from './SupplyChainDetailPanel';
import SupplyChainLegend from './SupplyChainLegend';
import { enhancedColors } from '@/utils/chartUtils';

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
  // Create a colorful palette for the supply chain nodes
  const nodeColors = [
    enhancedColors.blue,      // Manufacturer - Blue
    enhancedColors.teal,      // Port of Origin - Teal
    enhancedColors.green,     // Transport - Green
    enhancedColors.turquoise, // Port of Destination - Turquoise
    enhancedColors.purple,    // Customs - Purple
    enhancedColors.darkOrange,// Warehouse - Dark Orange
    enhancedColors.orange,    // Distribution - Orange
    enhancedColors.darkBlue   // Customer - Dark Blue
  ];
  
  // Add gradient colors
  const gradientColors = {
    connectorLine: "bg-gradient-to-r from-blue-300 to-blue-600",
    backgroundGradient: "bg-gradient-to-br from-blue-50 to-indigo-50"
  };

  return (
    <div className={`h-[400px] flex flex-col items-center justify-center border rounded-lg ${gradientColors.backgroundGradient} overflow-x-auto`}>
      <div className="min-w-[800px] w-full px-4 py-8">
        {/* Supply chain flow visualization */}
        <div className="flex justify-between items-center relative">
          {/* Connection lines with directional flow */}
          <div className={`absolute top-1/2 left-0 right-0 h-1.5 ${gradientColors.connectorLine} -z-10`}></div>
          
          {/* Directional arrows */}
          {steps.slice(0, -1).map((_, index) => (
            <div key={`arrow-${index}`} className="absolute" style={{ left: `${(index + 1) * (100 / steps.length) - 1.5}%`, top: 'calc(50% - 6px)' }}>
              <div className="w-4 h-4 border-t-2 border-r-2 border-blue-500 transform rotate-45"></div>
            </div>
          ))}
          
          {/* Nodes with colorful styling */}
          {steps.map((step, index) => (
            <SupplyChainNode
              key={step.id}
              step={step}
              index={index}
              isActive={activeStep === index}
              onClick={() => setActiveStep(activeStep === index ? null : index)}
              color={nodeColors[index % nodeColors.length]}
            />
          ))}
        </div>
        
        {/* Details panel for active step */}
        {activeStep !== null && (
          <SupplyChainDetailPanel 
            step={steps[activeStep]} 
            language={language}
            color={nodeColors[activeStep % nodeColors.length]}
          />
        )}
        
        {/* Legend */}
        {activeStep === null && (
          <SupplyChainLegend 
            steps={steps} 
            language={language} 
            nodeColors={nodeColors}
          />
        )}
      </div>
    </div>
  );
};

export default SupplyChainFlow;
